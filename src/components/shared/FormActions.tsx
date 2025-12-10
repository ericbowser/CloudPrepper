import React from 'react';
import { Button } from './Button';

interface FormActionsProps {
    onCancel: () => void;
    onSubmit?: () => void;
    submitLabel?: string;
    cancelLabel?: string;
    isLoading?: boolean;
    submitDisabled?: boolean;
    submitVariant?: 'primary' | 'secondary' | 'danger' | 'success';
    showCancel?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
    onCancel,
    onSubmit,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
    isLoading = false,
    submitDisabled = false,
    submitVariant = 'primary',
    showCancel = true
}) => {
    return (
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            {showCancel && (
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    {cancelLabel}
                </Button>
            )}
            <Button
                type="submit"
                variant={submitVariant}
                isLoading={isLoading}
                loadingText={submitLabel}
                disabled={submitDisabled || isLoading}
                onClick={onSubmit}
            >
                {submitLabel}
            </Button>
        </div>
    );
};

export default FormActions;

