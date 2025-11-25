import { supabase, isBackendConfigured } from './supabaseClient'

// Fallback data when backend is down
const FALLBACK_DATA = {
  siteConfig: {
    members_count: '120',
    events_count: '25',
    projects_count: '45',
    hero_title: 'The Future of Tech Starts Here',
    hero_subtitle: 'Join CoRE and build real-world projects in Web Dev, AI/ML, IoT, App Dev, Game Dev, and UI/UX Design',
    club_description: 'CoRE (Club of Robotics & Electronics) is VCET Puttur\'s premier technical club where students learn, build, and innovate together.',
    contact_email: 'core@vcet.edu.in',
    contact_phone: '+91 12345 67890'
  },
  coordinators: [
    { id: 1, name: 'Dr. Faculty Name', title: 'Faculty Coordinator', email: 'faculty@vcet.edu.in' },
    { id: 2, name: 'Student Name', title: 'President', email: 'president@core.vcet.in' },
    { id: 3, name: 'Another Student', title: 'Vice President', email: 'vp@core.vcet.in' }
  ],
  teamMembers: [
    { id: 1, name: 'John Doe', role: 'Lead', domain: 'Web Development', year: '3rd Year' },
    { id: 2, name: 'Jane Smith', role: 'Lead', domain: 'AI/ML', year: '3rd Year' },
    { id: 3, name: 'Alex Kumar', role: 'Lead', domain: 'IoT', year: '2nd Year' }
  ],
  events: []
}

/**
 * Fetch site configuration (counters, hero text, etc.)
 */
export async function getSiteConfig() {
  if (!isBackendConfigured() || !supabase) {
    return { data: FALLBACK_DATA.siteConfig, error: null, isOffline: true }
  }

  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('key, value')
    
    if (error) throw error
    
    // Convert array to object for easier access
    const config = {}
    data.forEach(item => {
      config[item.key] = item.value
    })
    
    return { data: config, error: null, isOffline: false }
  } catch (error) {
    console.error('Error fetching site config:', error)
    return { data: FALLBACK_DATA.siteConfig, error, isOffline: true }
  }
}

/**
 * Fetch coordinators list
 */
export async function getCoordinators() {
  if (!isBackendConfigured() || !supabase) {
    return { data: FALLBACK_DATA.coordinators, error: null, isOffline: true }
  }

  try {
    const { data, error } = await supabase
      .from('coordinators')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
    
    if (error) throw error
    return { data: data || FALLBACK_DATA.coordinators, error: null, isOffline: false }
  } catch (error) {
    console.error('Error fetching coordinators:', error)
    return { data: FALLBACK_DATA.coordinators, error, isOffline: true }
  }
}

/**
 * Fetch team members
 */
export async function getTeamMembers() {
  if (!isBackendConfigured() || !supabase) {
    return { data: FALLBACK_DATA.teamMembers, error: null, isOffline: true }
  }

  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
    
    if (error) throw error
    return { data: data || FALLBACK_DATA.teamMembers, error: null, isOffline: false }
  } catch (error) {
    console.error('Error fetching team members:', error)
    return { data: FALLBACK_DATA.teamMembers, error, isOffline: true }
  }
}

/**
 * Fetch dynamic events
 */
export async function getEvents() {
  if (!isBackendConfigured() || !supabase) {
    return { data: FALLBACK_DATA.events, error: null, isOffline: true }
  }

  try {
    const { data, error } = await supabase
      .from('dynamic_events')
      .select('*')
      .eq('is_active', true)
      .order('date', { ascending: false })
    
    if (error) throw error
    return { data: data || FALLBACK_DATA.events, error: null, isOffline: false }
  } catch (error) {
    console.error('Error fetching events:', error)
    return { data: FALLBACK_DATA.events, error, isOffline: true }
  }
}

/**
 * Update site config (admin only)
 */
export async function updateSiteConfig(key, value, user) {
  if (!supabase) throw new Error('Backend not configured')

  const { data, error } = await supabase
    .from('site_config')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key)
    .select()
  
  return { data, error }
}

/**
 * Add/Update team member (admin only)
 */
export async function upsertTeamMember(member) {
  if (!supabase) throw new Error('Backend not configured')

  const { data, error } = await supabase
    .from('team_members')
    .upsert(member)
    .select()
  
  return { data, error }
}

/**
 * Delete team member (admin only)
 */
export async function deleteTeamMember(id) {
  if (!supabase) throw new Error('Backend not configured')

  const { error } = await supabase
    .from('team_members')
    .update({ is_active: false })
    .eq('id', id)
  
  return { error }
}

/**
 * Add/Update coordinator (admin only)
 */
export async function upsertCoordinator(coordinator) {
  if (!supabase) throw new Error('Backend not configured')

  const { data, error } = await supabase
    .from('coordinators')
    .upsert(coordinator)
    .select()
  
  return { data, error }
}

/**
 * Delete coordinator (admin only)
 */
export async function deleteCoordinator(id) {
  if (!supabase) throw new Error('Backend not configured')

  const { error } = await supabase
    .from('coordinators')
    .update({ is_active: false })
    .eq('id', id)
  
  return { error }
}
