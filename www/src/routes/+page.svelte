<script lang="ts">
  import { onMount } from 'svelte'
  let isVisible = false
  
  onMount(() => {
    isVisible = true
  })
</script>

<div class="min-h-screen bg-white">
  <div class="container mx-auto px-4 py-8">
    <nav class="flex justify-between items-center mb-24 relative z-10">
      <h1 class="text-3xl font-bold text-slate-900">eGolf Tracker</h1>
      <div class="space-x-6">
        <a href="https://dev.egolftracker.com/auth/sign-in" class="text-slate-900 hover:text-green-600 transition-colors">Login</a>
        <a 
          href="https://dev.egolftracker.com/auth/sign-up" 
          class="bg-slate-900 text-white px-6 py-2.5 rounded-lg hover:bg-green-600 transition-all hover:scale-105"
        >
          Get Started
        </a>
      </div>
    </nav>

    <main class="py-20">
      <div class="max-w-7xl mx-auto">
        <div class:opacity-0={!isVisible} class:translate-y-4={!isVisible} class="transition-all duration-1000 ease-out">
          <div class="grid lg:grid-cols-2 gap-20 items-center">
            <div class="relative">
              <div class="absolute -top-20 -left-20 w-72 h-72 bg-green-200/50 rounded-full blur-3xl"></div>
              <div class="absolute bottom-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
              <div class="relative">
                <h2 class="text-[5.5rem] font-black leading-none tracking-tight text-slate-900 mb-8">
                  Level Up Your
                  <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                    Virtual Golf
                  </span>
                  Game
                </h2>
                <p class="text-xl text-slate-600 mb-12 leading-relaxed max-w-xl">
                  Take your game to the next level with powerful analytics, and a community of virtual golfers.
                </p>
                <div class="flex gap-6 items-center">
                  <a 
                    href="https://dev.egolftracker.com/auth/sign-up" 
                    class="bg-slate-900 text-white px-8 py-4 rounded-xl text-lg hover:bg-green-600 transition-all hover:scale-105 inline-flex items-center group"
                    target="_self"
                  >
                    Start Now
                    <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div class="relative lg:h-[600px] flex items-center justify-center">
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-100 rounded-full blur-3xl opacity-40"></div>
              <div class="relative w-full h-full">
<svg
   class="w-full h-full"
   viewBox="0 0 480.62857 486.69717"
   version="1.1"
   id="svg5"
   xml:space="preserve"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg"><defs
     id="defs2">
     <linearGradient id="golfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
       <stop offset="0%" style="stop-color:#16a34a;stop-opacity:1" />
       <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
     </linearGradient>
   </defs><g
     id="layer1"
     transform="translate(4339.2379,11209.894)"><path
       style="fill:url(#golfGradient);stroke-width:1"
       d="m -4023.9699,-10723.96 c 3.7617,-1.383 5.7686,-2.531 6.3745,-3.65 0.6499,-1.199 0.6406,-4.031 -0.015,-4.687 -0.2173,-0.218 -2.5381,-0.05 -5.1573,0.369 -2.6192,0.419 -8.9421,1.265 -14.0509,1.879 -11.8892,1.426 -21.2498,3.251 -25.5873,4.986 -4.3036,1.723 -6.1617,1.736 -38.6379,0.301 -37.6634,-1.666 -57.6197,-3.238 -111.4652,-8.781 -12.699,-1.307 -27.6274,-2.839 -33.1741,-3.403 -11.1611,-1.138 -62.1234,-5.322 -81.2081,-6.67 -6.7132,-0.474 -12.2686,-0.924 -12.3456,-1.001 -0.077,-0.08 4.0634,-0.299 9.2008,-0.492 26.8445,-1.012 47.8073,-4.739 80.1066,-14.238 27.5986,-8.115 40.5325,-11.465 55.9979,-14.499 24.98,-4.902 34.8175,-5.844 61.0406,-5.844 22.296,0 24.9398,0.158 46.0556,2.752 6.209,0.761 11.409,1.265 11.5555,1.119 0.146,-0.15 0.015,-1.474 -0.3087,-2.949 -1.21,-5.642 1.3358,-9.345 11.3017,-16.435 l 4.6444,-3.304 v -2.535 c 0,-1.393 -0.3692,-5.758 -0.8144,-9.7 -1.2038,-10.66 -1.7789,-27.156 -1.3227,-37.95 l 0.4037,-9.555 -1.9823,-3.981 c -3.1815,-6.39 -6.8315,-15.977 -8.0126,-21.047 -1.5572,-6.685 -1.9406,-21.014 -0.7952,-29.721 2.7754,-21.1 11.8437,-43.051 28.9568,-70.096 l 1.7488,-2.764 -0.9328,-3.445 c -1.5335,-5.666 -0.9676,-10.112 2.0486,-16.096 1.3582,-2.695 2.4695,-5.465 2.4695,-6.157 0,-1.267 -2.1707,-4.645 -4.0359,-6.282 -0.5536,-0.484 -3.7534,-2.578 -7.1106,-4.652 l -6.1041,-3.77 -0.3176,4.387 c -0.3795,5.242 -2.3989,10.51 -6.2313,16.256 -6.1998,9.294 -13.0687,16.154 -31.6924,31.655 -13.8615,11.537 -19.0017,16.188 -20.4116,18.467 -0.7141,1.156 -0.8594,2.269 -0.6598,5.06 0.2114,2.955 0.06,3.945 -0.8686,5.677 -0.6185,1.154 -1.1245,2.319 -1.1245,2.586 0,0.951 -2.6699,3.972 -3.8372,4.344 -0.6512,0.206 -1.8395,1.077 -2.6405,1.935 -1.0514,1.125 -1.8666,1.518 -2.9301,1.411 -1.072,-0.105 -1.9322,0.316 -3.1577,1.552 -1.7645,1.779 -3.6269,2.16 -5.5454,1.132 -0.8741,-0.467 -1.2421,-0.328 -2.1352,0.807 -1.5302,1.945 -3.7385,2.943 -6.5138,2.943 -1.9247,0 -2.7665,-0.325 -4.2767,-1.651 l -1.8801,-1.65 -3.8443,2.302 c -3.8934,2.332 -16.0326,10.416 -46.8379,31.192 -43.9078,29.613 -69.2587,46.783 -82.6822,56.004 -13.7056,9.414 -15.0561,10.115 -19.4942,10.119 -2.9042,0 -3.9688,-0.276 -6.728,-1.764 -7.4549,-4.024 -15.0438,-14.437 -15.0314,-20.627 0.015,-4.622 3.373,-8.796 8.4472,-10.481 3.6644,-1.217 8.9823,-0.939 11.0505,0.579 2.1576,1.585 4.5141,6.368 7.5535,15.331 1.4849,4.378 2.9075,8.293 3.1611,8.701 0.3795,0.608 0.871,0.508 2.7718,-0.556 1.2706,-0.713 18.6718,-12.966 38.6692,-27.233 19.9974,-14.265 39.1057,-27.884 42.4629,-30.266 34.5126,-24.474 47.4117,-33.816 49.819,-36.08 3.5713,-3.358 5.2446,-6.638 6.5006,-12.74 1.8331,-8.905 2.2728,-9.802 9.0024,-18.362 2.3982,-3.049 5.0285,-6.948 5.8449,-8.663 l 1.4845,-3.116 -1.0973,-2.722 c -2.1644,-5.37 -2.6573,-7.566 -2.6948,-12.011 -0.051,-6.143 0.7495,-9.455 4.688,-19.373 4.2428,-10.684 4.7919,-12.903 5.7796,-23.356 1.2905,-13.653 2.2137,-16.227 8.7565,-24.415 6.4914,-8.125 7.6165,-10.565 16.7456,-36.337 l 4.0347,-11.392 -0.3715,-11.034 c -0.2043,-6.07 -0.5246,-11.036 -0.7119,-11.036 -0.1872,0 -1.4052,1.093 -2.7068,2.431 -2.8625,2.941 -4.6468,3.939 -7.0454,3.939 -2.4987,0 -4.2837,-1.583 -5.7341,-5.081 -0.9546,-2.304 -1.6116,-3.124 -2.9521,-3.683 -1.0678,-0.446 -1.8497,-1.22 -2.0536,-2.033 -0.181,-0.721 -0.7503,-1.422 -1.265,-1.556 -0.6005,-0.158 -1.169,-1.17 -1.5866,-2.83 -0.9011,-3.578 -1.4055,-4.058 -3.837,-3.647 -2.4057,0.406 -5.5148,-0.501 -6.042,-1.765 -0.2075,-0.496 -0.4991,-3.948 -0.6482,-7.67 -0.149,-3.723 -0.3822,-6.768 -0.5179,-6.768 -0.1354,0 -2.2548,0.996 -4.7089,2.212 -3.7937,1.879 -5.0837,2.246 -8.6112,2.451 -5.9442,0.344 -8.5852,-1.204 -8.5852,-5.032 0,-1.877 1.5094,-3.525 6.7742,-7.393 2.2589,-1.661 5.2414,-3.959 6.6282,-5.108 l 2.5213,-2.09 0.018,-3.534 c 0.027,-5.074 1.2223,-11.079 2.9299,-14.717 2.8831,-6.14 10.7804,-12.151 19.1685,-14.588 1.2636,-0.369 2.3145,-1.034 2.4502,-1.553 0.3134,-1.198 4.5013,-3.196 6.7012,-3.196 1.2757,0 1.8117,0.276 2.0092,1.031 0.2123,0.812 0.9041,1.098 3.2677,1.354 10.5412,1.142 16.9149,3.816 22.5829,9.474 5.0438,5.036 6.8857,8.899 8.8724,18.605 0.8301,4.056 2.1732,8.802 2.9845,10.545 l 1.4753,3.172 6.3654,-0.08 c 12.5387,-0.16 22.291,2.732 33.4179,9.908 14.2505,9.188 38.6288,31.585 48.06,44.155 2.7244,3.63 8.2322,10.284 12.2399,14.785 7.4813,8.404 8.5802,9.98 9.5042,13.646 0.6528,2.589 4.0737,7.14 11.1693,14.862 9.1206,9.924 13.2589,17.152 13.2589,23.157 0,2.501 -0.1856,2.927 -2.0448,4.694 l -2.0448,1.946 2.042,3.945 c 6.2691,12.106 9.1988,29.917 7.1098,43.221 -2.1706,13.826 -7.5452,25.282 -23.2835,49.629 -11.188,17.309 -18.7319,30.56 -25.0596,44.018 l -4.1002,8.721 0.9548,2.692 c 5.4844,15.458 15.4475,31.373 26.7868,42.79 7.2605,7.311 13.4492,11.853 22.4024,16.447 10.6047,5.44 12.0866,7.27 12.1161,14.96 l 0.017,4.396 2.3747,1.44 c 3.6089,2.191 3.8435,3.19 1.8926,8.062 -0.8999,2.248 -3.8006,8.009 -6.4459,12.802 -6.2066,11.246 -7.8566,14.87 -11.0847,24.34 -1.4606,4.285 -3.6397,9.682 -4.8424,11.995 -3.4557,6.641 -9.8519,12.981 -21.5749,21.385 l -4.8806,3.496 -27.2498,0.571 c -14.9874,0.312 -28.5555,0.552 -30.1514,0.532 l -2.9015,-0.03 z m 53.3065,-9.246 c 6.0565,-2.75 12.0636,-11.545 14.1667,-20.742 1.0387,-4.541 1.7107,-14.619 1.004,-15.055 -0.293,-0.181 -1.8123,0.233 -3.3763,0.919 -1.564,0.686 -4.1574,1.551 -5.7631,1.92 -1.6055,0.37 -3.1802,0.74 -3.4992,0.823 -0.319,0.09 -1.3559,2.371 -2.3044,5.089 -0.9485,2.715 -3.6134,8.58 -5.9222,13.032 -4.8459,9.347 -5.0651,10.558 -2.3931,13.23 2.137,2.137 4.5857,2.374 8.0876,0.784 z m -118.1727,-1.142 c 5.3157,-1.354 10.0983,-3.421 13.609,-5.883 1.391,-0.976 2.7573,-1.93 3.0364,-2.123 0.279,-0.191 -0.3745,-1.378 -1.4522,-2.637 -1.0778,-1.26 -2.5799,-3.557 -3.3383,-5.107 -1.3035,-2.665 -1.4402,-2.779 -2.5033,-2.082 -6.5147,4.262 -11.1787,6.351 -19.9231,8.919 -6.4321,1.89 -9.2132,3.26 -10.1435,4.998 -0.9816,1.834 -0.2279,3.894 1.7579,4.804 2.4467,1.121 13.0087,0.626 18.9571,-0.889 z"
       id="path27" /></g></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <section id="features" class="py-32 bg-slate-50">
    <div class="container mx-auto px-4">
      <h3 class="text-5xl font-bold text-center mb-24 text-slate-900">
        Everything you need
      </h3>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        <div class="bg-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
          <div class="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
            <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <h4 class="text-2xl font-bold mb-4 text-slate-900">Advanced Stats</h4>
          <p class="text-slate-600">Track every aspect of your game with detailed analytics and insights.</p>
        </div>

        <div class="bg-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
          <div class="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
            <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          </div>
          <h4 class="text-2xl font-bold mb-4 text-slate-900">Compare & Compete</h4>
          <p class="text-slate-600">See how you stack up against other golfers in the community.</p>
        </div>

        <div class="bg-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
          <div class="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
            <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h4 class="text-2xl font-bold mb-4 text-slate-900">Easy Integration</h4>
          <p class="text-slate-600">Works seamlessly with all major virtual golf platforms.</p>
        </div>
      </div>
    </div>
  </section>

  <footer class="bg-white border-t border-slate-200 py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="space-y-4">
          <h4 class="text-lg font-bold text-slate-900 mb-4">eGolf Tracker</h4>
          <p class="text-slate-600 text-sm">
            The ultimate virtual golf companion for tracking and improving your game.
          </p>
          <div class="flex space-x-4 pt-2">
            <a href="#" class="text-slate-400 hover:text-green-600 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="text-slate-400 hover:text-green-600 transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
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
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
</style>
