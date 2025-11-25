// Small JS for nav toggle and year insertion
document.addEventListener('DOMContentLoaded',function(){
  var btn = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if(btn && nav){
    btn.addEventListener('click',function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }
  var y = new Date().getFullYear();
  var ys = document.getElementById('year'); if(ys) ys.textContent = y;
  var y2 = document.getElementById('year2'); if(y2) y2.textContent = y;
  var y3 = document.getElementById('year3'); if(y3) y3.textContent = y;
});