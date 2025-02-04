<script lang="ts">
  import { Card, Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell } from 'flowbite-svelte'
</script>
<h1 class="text-2xl font-bold">Dashboard</h1>
<div class="flex flex-row gap-4">
  <Card>
    <p>10</p>
    <h3>Rounds Played</h3>
  </Card>
  <Card>
    <p>10</p>
    <h3>Average Score</h3>
  </Card>
  <Card>
    <p>10</p>
    <h3>Best Score</h3>
  </Card>
</div>

<h2 class="text-xl font-bold mt-4">All Rounds</h2>
<div class="mt-4">
  <Table>
    <TableHead>
      <TableHeadCell>Date</TableHeadCell>
      <TableHeadCell>Course</TableHeadCell>
      <TableHeadCell>Score</TableHeadCell>
      <TableHeadCell>Rounds</TableHeadCell>
  </TableHead>
  <TableBody tableBodyClass="divide-y">
    <TableBodyRow>
      <TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
      <TableBodyCell>Sliver</TableBodyCell>
      <TableBodyCell>Laptop</TableBodyCell>
      <TableBodyCell>$2999</TableBodyCell>
    </TableBodyRow>
    <TableBodyRow>
      <TableBodyCell>Microsoft Surface Pro</TableBodyCell>
      <TableBodyCell>White</TableBodyCell>
      <TableBodyCell>Laptop PC</TableBodyCell>
      <TableBodyCell>$1999</TableBodyCell>
    </TableBodyRow>
    <TableBodyRow>
      <TableBodyCell>Magic Mouse 2</TableBodyCell>
      <TableBodyCell>Black</TableBodyCell>
      <TableBodyCell>Accessories</TableBodyCell>
        <TableBodyCell>$99</TableBodyCell>
      </TableBodyRow>
    </TableBody>
  </Table>
</div>