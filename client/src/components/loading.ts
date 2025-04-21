const loading = document.querySelector('.loading') as HTMLDivElement;

export const toggleLoading = (show: boolean) => {
    console.log("here");
    
    loading.style.display = show ? 'flex' : 'none';
}