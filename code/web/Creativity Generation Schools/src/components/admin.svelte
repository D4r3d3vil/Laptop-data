<script>
    import { onMount } from 'svelte';
    import { db } from '../firebase/config';
    import { userData } from '../firebase/user-management';
    import { collection, getDocs, query, where } from "firebase/firestore";
    import Uploads from './uploads.svelte';
    let uploading = false
</script>
<Uploads/>