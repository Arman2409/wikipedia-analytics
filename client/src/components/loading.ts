const loadingDemo = document.querySelector('.loading') as HTMLDivElement;

export const toggleLoading = (
    show: boolean
) => {
    loadingDemo.style.display = show ? 'flex' : 'none';
}