import React, { useRef, useEffect } from 'react'

function hexToRgb(h){
  if(!h) return [0,0,0]
  h = h.trim()
  if(h[0]==='#') h = h.slice(1)
  if(h.length===3) h = h.split('').map(s=>s+s).join('')
  const num = parseInt(h,16)
  return [(num>>16)&255, (num>>8)&255, num&255]
}

export default function GLCanvas(){
  const ref = useRef(null)

  useEffect(()=>{
    const canvas = document.createElement('canvas')
    canvas.className = 'gl-canvas'
    canvas.style.position = 'absolute'
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.zIndex = '0'
    canvas.style.pointerEvents = 'none'
    ref.current = canvas
    const container = document.querySelector('.hero') || document.body
    container.prepend(canvas)

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if(!gl) return

    // shader sources
    const vs = `attribute vec2 position; void main(){ gl_Position = vec4(position, 0.0, 1.0); }`
    // Metaballs-style soft blobs shader inspired by doodle shapes
    const fs = `precision mediump float; uniform float u_time; uniform vec2 u_res; uniform vec2 u_mouse; uniform vec3 u_col1; uniform vec3 u_col2; uniform float u_intensity;
    // compute soft circle field
    float field(vec2 p, vec2 c, float r){
      float d = length(p - c);
      return exp(-d*d * r);
    }
    void main(){
      vec2 uv = gl_FragCoord.xy / u_res.xy;
      vec2 p = (uv - 0.5) * vec2(u_res.x/u_res.y, 1.0);
      float t = u_time * 0.35;
  // moving blob centers (slower, less extreme motion for calmer look)
  vec2 c1 = vec2(sin(t*0.45)*0.28, cos(t*0.6)*0.18);
  vec2 c2 = vec2(cos(t*0.4)*0.22 + 0.12, sin(t*0.5)*0.22 - 0.03);
  vec2 c3 = vec2(sin(t*0.35 + 2.0)*0.18 - 0.16, cos(t*0.4 + 1.3)*0.14 + 0.08);
      // small subtle noise via trig (cheap)
  float n = 0.01 * sin((p.x+p.y)*6.0 + t*0.9);
      float v = 0.0;
      v += field(p, c1, 4.0);
      v += field(p, c2, 5.2);
      v += field(p, c3, 6.0);
      v += field(p, vec2(0.0, -0.15), 3.2) * 0.6;
      v = v + n;
      // mouse soft influence
      vec2 m = (u_mouse.xy / u_res.xy - 0.5) * vec2(u_res.x/u_res.y,1.0);
  // reduce mouse influence so it doesn't create a hard hotspot
  float md = exp(-length(p - m)*8.0) * 0.20;
  v += md * 0.6 * u_intensity;
  v = clamp(v * 0.7 * u_intensity, 0.0, 1.0);
      // color between two theme colors, keep low contrast
      vec3 col = mix(u_col1/255.0, u_col2/255.0, v);
  // gentle vignette to keep edges calm
  float r = length(p);
  float vig = smoothstep(0.9, 0.4, r);
  col *= vig * (0.55 + 0.25 * u_intensity);
      gl_FragColor = vec4(col, 1.0);
    }`

    function compile(type, src){
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if(!gl.getShaderParameter(s, gl.COMPILE_STATUS)){
        console.warn('Shader compile error', gl.getShaderInfoLog(s))
      }
      return s
    }

    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs))
    gl.linkProgram(prog)
    if(!gl.getProgramParameter(prog, gl.LINK_STATUS)){
      console.warn('Program link error', gl.getProgramInfoLog(prog))
    }

    const pos = gl.getAttribLocation(prog, 'position')
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1,  -1,1, 1,-1, 1,1]), gl.STATIC_DRAW)

  const u_time = gl.getUniformLocation(prog, 'u_time')
    const u_res = gl.getUniformLocation(prog, 'u_res')
    const u_mouse = gl.getUniformLocation(prog, 'u_mouse')
  const u_intensity = gl.getUniformLocation(prog, 'u_intensity')
    const u_col1 = gl.getUniformLocation(prog, 'u_col1')
    const u_col2 = gl.getUniformLocation(prog, 'u_col2')

    let start = performance.now()
    let mouse = [0,0]

    function resize(){
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      gl.viewport(0,0,canvas.width, canvas.height)
    }

    // theme-aware colors from CSS variables
    function themeColors(){
      const cs = getComputedStyle(document.documentElement)
      const brand = cs.getPropertyValue('--brand-primary') || '#000'
      const bg = cs.getPropertyValue('--bg') || '#fff'
      const b = hexToRgb(brand)
      const g = hexToRgb(bg)
      // create a soft, hand-drawn midtone by blending brand and background then lightening
      const mid = [
        Math.min(255, Math.round(g[0]*0.75 + b[0]*0.25 + 18)),
        Math.min(255, Math.round(g[1]*0.75 + b[1]*0.25 + 18)),
        Math.min(255, Math.round(g[2]*0.75 + b[2]*0.25 + 18))
      ]
      return { c1: mid, c2: g }
    }

    function render(){
      const t = (performance.now() - start)/1000
      gl.useProgram(prog)
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.enableVertexAttribArray(pos)
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
      gl.uniform1f(u_time, t)
      gl.uniform2f(u_res, canvas.width, canvas.height)
      gl.uniform2f(u_mouse, mouse[0], mouse[1])
  // base intensity; reduce on small screens or when reduced-motion is preferred
  // lowered to make blobs calmer and less likely to visually compete with doodles
  const baseIntensity = (prefersReduced || window.innerWidth < 720) ? 0.38 : 0.42
  gl.uniform1f(u_intensity, baseIntensity)
      const cols = themeColors()
      gl.uniform3fv(u_col1, new Float32Array(cols.c1))
      gl.uniform3fv(u_col2, new Float32Array(cols.c2))
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    let raf=0
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function loop(){
      render()
      if(!prefersReduced) raf = requestAnimationFrame(loop)
    }

    // events
    function onMove(e){
      const r = canvas.getBoundingClientRect()
      mouse[0] = (e.clientX - r.left)
      mouse[1] = (r.height - (e.clientY - r.top))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)
    resize()
  // subtle fade-in for the canvas so changes aren't jarring
  canvas.style.transition = 'opacity 900ms ease'
  // lower default canvas opacity so doodles and text remain clear
  canvas.style.opacity = prefersReduced ? '0.55' : '0.72'
  // start render loop
  loop()

    return ()=>{
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      if(canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  }, [])

  return null
}
