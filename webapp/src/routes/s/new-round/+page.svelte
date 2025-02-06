<script lang="ts">
	import { goto } from '$app/navigation';
	import { makeRequest } from '$lib/api';
  import moment from 'moment'
  import { FloppyDiskSolid } from 'flowbite-svelte-icons'
  
  let courseName = ''
  let coursePar = 72
  let courseLength = 7000
  let roundDate = moment().format('YYYY-MM-DD')
  let roundScore = 72
  let roundPutts = 36
  let fairwayPercentage = 100
  let greenPercentage = 100
  let isLoading = false

  const handleSave = async () => {
    const formData = {
      courseName,
      coursePar,
      courseLength,
      roundDate,
      roundScore,
      roundPutts,
      fairwayPercentage,
      greenPercentage
    }
    
    isLoading = true
    const response = await makeRequest('/round', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    isLoading = false
    
    console.log(response)
    
    console.log('Form data:', formData)
    goto('/s/dashboard')
  }
</script>

<h1 class="text-4xl font-bold mt-6">New Round</h1>

<form class="" on:submit|preventDefault={handleSave}>
  <h2 class="text-xl font-bold mt-7 mb-4">Course Details</h2>
  <div class="my-4">
    <label for="course-name" class="label">Course Name</label>
    <input class="input input-bordered w-full" id="course-name" bind:value={courseName} placeholder="Course Name" />
  </div>

  <div class="flex flex-row gap-4">
    <div>
      <label for="course-par" class="label">Course Par</label>
      <input class="input input-bordered" id="course-par" bind:value={coursePar} placeholder="Course Par" type="number" />
    </div>
    <div>
      <label for="course-length" class="label">Course Length</label>
      <input class="input input-bordered" id="course-length" bind:value={courseLength} placeholder="Course Length" type="number" />
    </div>
  </div>

  <h2 class="text-xl font-bold mt-7 mb-4">Round Details</h2>
  <div class="my-4">
    <label for="round-date" class="label">Round Date</label>
    <input class="input input-bordered" id="round-date" bind:value={roundDate} type="date" />
  </div>

  <div class="flex flex-row gap-4 mb-4">
    <div>
      <label for="round-score" class="label">Round Score</label>
      <input class="input input-bordered" id="round-score" bind:value={roundScore} placeholder="Round Score" type="number" />
    </div>
    <div>
      <label for="round-putts" class="label">Putts</label>
      <input class="input input-bordered" id="round-putts" bind:value={roundPutts} placeholder="Putts" type="number" />
    </div>
  </div>

  <div>
    <label for="fairway-percentage" class="label">Fairway %</label>

    <input id="fairway-percentage" type="range" min="0" max="100" bind:value={fairwayPercentage} class="range" />
    <span class="text-sm text-center w-full block">{fairwayPercentage}%</span>
  </div>
  <div>
    <label for="green-percentage" class="label">Green %</label>
    <input id="green-percentage" type="range" min="0" max="100" bind:value={greenPercentage} class="range" />
    <span class="text-sm text-center w-full block">{greenPercentage}%</span>
  </div>
  <button type="submit" class="btn btn-primary mt-4 float-end" disabled={isLoading}>
    Save
    {#if isLoading}
      <span class="loading loading-spinner loading-xs"></span>
    {/if}
    <FloppyDiskSolid class="ml-1" />
  </button>
</form>