<script>
    import { onMount } from "svelte";
    import { userData } from "../firebase/user-management";
    import CodeEditor, { Ucss, Uhtml, Ujs } from "./codeEditor.svelte";
    import { collection, getDocs } from "firebase/firestore";
    import { db } from "../firebase/config";

    let requests=[], uploads=[]
    async function updateRequests(){
    (await getDocs(collection(db, 'pushRequests'))).forEach((doc)=>{
        requests.push(doc.data())
    })
    requests=requests
    }
    async function updateUploads(){
        (await getDocs(collection(db, 'sites'))).forEach((doc)=>{
        uploads.push(doc.data())
    })
    uploads=uploads
    }
     updateRequests()
     updateUploads()
    let open=''
</script>
{#if uploads.length>0}
<p>Awaiting approval:</p>
{#each requests as request}
<p>name: {request.name}</p>
<p>description: {request.description}</p>
{#if open==request.name}
    <button on:click={function(){open='';}}>hide code</button>
    <CodeEditor/>
    {:else}
    <button on:click={function(){Uhtml.set(request.html);Ucss.set(request.css);Ujs.set(request.js);open=request.name}}>show code</button>
    {/if}
{/each}
<p>Approved:</p>
{#each uploads as request}
<p>name: {request.name}</p>
<p>description: {request.description}</p>
<a href={`${window.location.href+'pages/'+request.name}`}>link</a>
{#if open==request.name}
    <button on:click={function(){open='';}}>hide code</button>
    <CodeEditor/>
    {:else}
    <button on:click={function(){Uhtml.set(request.html);Ucss.set(request.css);Ujs.set(request.js);open=request.name}}>show code</button>
    {/if}
{/each}
{/if}