<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
    import CodeEditor from "./codeEditor.svelte";
export let uploads
let loaded = [], open='', newdescription
</script>
<div class="uploaded">
{#each uploads as upload}
{#if open!=upload.name}
<div class="upload">
    <p>{upload.name}:</p><br>
    {#if upload.deleted}
        <p>Unapproved; You can re-submit when you make some changes. <br>note from admin: {upload.note}</p>
    {/if}
</div>
{:else}
<p>Name: <input type="text" value={upload.name}></p>
<p>Description: <textarea cols="50" rows="10" maxlength="3000" value={upload.description}  minlength="20"></textarea></p>
<div class="openUpload">
    <CodeEditor/>
</div>
{/if}
{/each}
</div>