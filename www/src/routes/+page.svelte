<script lang="ts">
  import { onMount } from 'svelte'
  
  let isVisible = false
  
  onMount(() => {
    isVisible = true
  })
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-green-100">
  <div class="container mx-auto px-4 py-8">
    <nav class="flex justify-between items-center mb-24 relative z-10">
      <h1 class="text-3xl font-bold text-slate-900 tracking-tight">eGolf Tracker</h1>
      <div class="space-x-6">
        <a href="https://dev.egolftracker.com/auth/sign-in" class="text-slate-900 hover:text-green-700 transition-colors">Login</a>
        <a 
          href="https://dev.egolftracker.com/auth/sign-up" 
          class="bg-green-600 text-white px-6 py-2.5 rounded-full hover:bg-green-700 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          Get Started
        </a>
      </div>
    </nav>

    <main>
      <div class="relative md:max-w-3xl mb-40">
        <div class:opacity-0={!isVisible} class:translate-y-4={!isVisible} class="transition-all duration-1000 ease-out">
          <h2 class="text-6xl font-bold text-slate-900 mb-8 leading-tight">
            Elevate Your <span class="text-green-600">Virtual Golf</span> Experience
          </h2>
          <p class="text-xl text-slate-800/90 mb-10 leading-relaxed max-w-2xl">
            Take your game to new heights with advanced statistics, AI-powered insights, and a community of virtual golfers. Start your journey to improvement today.
          </p>
          <div class="space-x-6">
            <a 
              href="https://dev.egolftracker.com/auth/sign-up" 
              class="bg-green-600 text-white px-8 py-4 rounded-full text-lg hover:bg-green-700 transition-all hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center"
              target="_self"
            >
              Start Tracking Now
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a 
              href="#features" 
              class="text-slate-800 px-8 py-4 rounded-full text-lg hover:text-green-600 transition-colors inline-flex items-center hover:bg-white/50"
            >
              Learn More
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>

  <section id="features" class="bg-white py-32 relative">
    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-green-50/30"></div>
    <div class="container mx-auto px-4 relative">
      <h3 class="text-4xl font-bold text-center mb-20 text-slate-900">
        Everything you need to improve
      </h3>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
        <div class="group hover:-translate-y-2 transition-all duration-300">
          <div class="flex flex-col items-center text-center p-8 rounded-2xl bg-white hover:shadow-xl transition-all">
            <div class="bg-green-100 p-4 rounded-xl mb-6 group-hover:bg-green-200 transition-colors">
              <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-3 text-slate-900">Advanced Statistics</h4>
            <p class="text-slate-700/80">Comprehensive tracking and analysis of every aspect of your game</p>
          </div>
        </div>

        <div class="group hover:-translate-y-2 transition-all duration-300">
          <div class="flex flex-col items-center text-center p-8 rounded-2xl bg-white hover:shadow-xl transition-all">
            <div class="bg-green-100 p-4 rounded-xl mb-6 group-hover:bg-green-200 transition-colors">
              <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-3 text-slate-900">Performance Insights</h4>
            <p class="text-slate-700/80">See how you stack up against other golfers</p>
          </div>
        </div>

        <div class="group hover:-translate-y-2 transition-all duration-300">
          <div class="flex flex-col items-center text-center p-8 rounded-2xl bg-white hover:shadow-xl transition-all">
            <div class="bg-green-100 p-4 rounded-xl mb-6 group-hover:bg-green-200 transition-colors">
              <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-3 text-slate-900">Social Features</h4>
            <p class="text-slate-700/80">Connect and compete with friends in your virtual golf journey</p>
          </div>
        </div>

        <div class="group hover:-translate-y-2 transition-all duration-300">
          <div class="flex flex-col items-center text-center p-8 rounded-2xl bg-white hover:shadow-xl transition-all">
            <div class="bg-green-100 p-4 rounded-xl mb-6 group-hover:bg-green-200 transition-colors">
              <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-3 text-slate-900">Seamless Integration</h4>
            <p class="text-slate-700/80">Works with all major virtual golf platforms and simulators</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="bg-white border-t border-slate-200 py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-slate-900 mb-4">eGolf Tracker</h4>
          <p class="text-slate-600 text-sm">
            Elevate your virtual golf game with comprehensive tracking and analytics.
          </p>
          <div class="flex space-x-4 pt-2">
            <a href="#" class="text-slate-500 hover:text-green-600 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="text-slate-500 hover:text-green-600 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-slate-900 mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li><a href="/features" class="text-slate-600 hover:text-green-600 transition-colors">Features</a></li>
            <li><a href="/pricing" class="text-slate-600 hover:text-green-600 transition-colors">Pricing</a></li>
            <li><a href="/blog" class="text-slate-600 hover:text-green-600 transition-colors">Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-slate-900 mb-4">Support</h4>
          <ul class="space-y-2">
            <li><a href="/help" class="text-slate-600 hover:text-green-600 transition-colors">Help Center</a></li>
            <li><a href="/contact" class="text-slate-600 hover:text-green-600 transition-colors">Contact Us</a></li>
            <li><a href="/faq" class="text-slate-600 hover:text-green-600 transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-slate-900 mb-4">Legal</h4>
          <ul class="space-y-2">
            <li><a href="/privacy" class="text-slate-600 hover:text-green-600 transition-colors">Privacy Policy</a></li>
            <li><a href="/terms" class="text-slate-600 hover:text-green-600 transition-colors">Terms of Service</a></li>
            <li><a href="/cookies" class="text-slate-600 hover:text-green-600 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-200 mt-12 pt-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} eGolf Tracker. All rights reserved.</p>
      </div>
    </div>
  </footer>

</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
