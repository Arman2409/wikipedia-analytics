import { SNACKBAR_DEFAULT_DURATION } from "../../constants/configs";
import { sliceString } from "../../utils/helpers";
import { snackbarLevelColors } from "./utils/data";
import type { SnackbarLevel } from "../../types/snackbar";


const snackbar = document.querySelector('.snackbar') as HTMLDivElement;

export const showSnackbar = (
    message: string,
    level: SnackbarLevel  = "info",
    duration: number = SNACKBAR_DEFAULT_DURATION,
) => {
    if(snackbar) {
        snackbar.textContent = sliceString(message, 100);

        // Change the color 
        const textColor = snackbarLevelColors.get(level) || 'green';
        snackbar.style.color = textColor;

        // Change the opacity 
        snackbar.classList.remove('opacity-0', 'pointer-events-none');
        snackbar.classList.add('opacity-100');
    
        setTimeout(() => {
            // Close the snackbar 
            snackbar.classList.remove('opacity-100');
            snackbar.classList.add('opacity-0', 'pointer-events-none');
        }, duration * 1000);
    }
}