const loading = document.querySelector('.loading') as HTMLDivElement;

export const toggleLoading = (
    show: boolean
) => {
    loading.style.display = show ? 'flex' : 'none';
}