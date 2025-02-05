<script lang="ts">
	import { goto } from '$app/navigation';
	import { makeRequest } from '$lib/api';
  import { Label, Input, Button } from 'flowbite-svelte'
  import { FloppyDiskSolid } from 'flowbite-svelte-icons'
  
  let courseName = ''
  let coursePar = 0
  let courseLength = 0
  let roundDate = ''
  let roundScore = 0
  let roundPutts = 0
  let fairwayPercentage = 0
  let greenPercentage = 0

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
    
    const response = await makeRequest('/round', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    
    console.log(response)
    
    console.log('Form data:', formData)
    goto('/s/dashboard')
  }
</script>

<h1 class="text-2xl font-bold">New Round</h1>

<form class="max-w-2xl" on:submit|preventDefault={handleSave}>
  <h2 class="text-xl font-bold mt-7 mb-4">Course Details</h2>
  <div class="my-4">
    <Label for="course-name" class="block mb-2">Course Name</Label>
    <Input id="course-name" bind:value={courseName} placeholder="Course Name" />
  </div>

  <div class="flex flex-row gap-4">
    <div>
      <Label for="course-par" class="block mb-2">Course Par</Label>
      <Input id="course-par" bind:value={coursePar} placeholder="Course Par" type="number" />
    </div>
    <div>
      <Label for="course-length" class="block mb-2">Course Length</Label>
      <Input id="course-length" bind:value={courseLength} placeholder="Course Length" type="number" />
    </div>
  </div>

  <h2 class="text-xl font-bold mt-7 mb-4">Round Details</h2>
  <div class="my-4">
    <Label for="round-date" class="block mb-2">Round Date</Label>
    <Input id="round-date" bind:value={roundDate} type="date" />
  </div>

  <div class="flex flex-row gap-4 mb-4">
    <div>
      <Label for="round-score" class="block mb-2">Round Score</Label>
      <Input id="round-score" bind:value={roundScore} placeholder="Round Score" type="number" />
    </div>
    <div>
      <Label for="round-putts" class="block mb-2">Putts</Label>
      <Input id="round-putts" bind:value={roundPutts} placeholder="Putts" type="number" />
    </div>
  </div>

  <div class="flex flex-row gap-4">
    <div>
      <Label for="fairway-percentage" class="block mb-2">Fairway %</Label>
      <Input id="fairway-percentage" bind:value={fairwayPercentage} placeholder="Fairways" type="number" />
    </div>
    <div>
      <Label for="green-percentage" class="block mb-2">Green %</Label>
      <Input id="green-percentage" bind:value={greenPercentage} placeholder="Green %" type="number" />
    </div>
  </div>
  <Button type="submit" class="mt-4">Save<FloppyDiskSolid class="ml-1" /></Button>
</form>