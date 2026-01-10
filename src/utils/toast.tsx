import toast, { type ToastOptions } from 'react-hot-toast';
import { Check, AlertCircle, Info, X } from 'lucide-react';

// Helper to determine style based on current theme (this is a simplified approach, 
// ideally we'd check the class on html/body or use a context, but react-hot-toast 
// styles are often static. We can use className for tailwind support instead).

const toastConfig: ToastOptions = {
    duration: 4000,
    position: 'top-right',
    className: "font-inconsolata text-sm font-bold border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]",
};

export const notify = {
    success: (message: string) => toast.success(message, {
        ...toastConfig,
        icon: <Check size={20} className="text-green-600 dark:text-green-400" />,
        style: undefined, // Let className handle it
    }),

    error: (message: string) => toast.error(message, {
        ...toastConfig,
        icon: <X size={20} className="text-red-600 dark:text-red-400" />,
        style: undefined,
    }),

    // Custom notification for deletes or specialized actions
    delete: (message: string) => toast.custom((t) => (
        <div
            className={`${t.visible ? 'animate-in fade-in slide-in-from-bottom-5' : 'animate-out fade-out slide-out-to-bottom-5'
                } flex items-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-500 text-red-700 dark:text-red-300 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.5)] font-inconsolata font-bold`}
        >
            <AlertCircle size={20} />
            <span>{message}</span>
        </div>
    ), { duration: 4000, position: 'top-right' }),

    info: (message: string) => toast(message, {
        ...toastConfig,
        icon: <Info size={20} className="text-blue-600 dark:text-blue-400" />,
    })
};

export default notify;
