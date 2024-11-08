import Checkbox from '@/Components/Checkbox';
import DangerLinkButton from '@/Components/DangerLinkButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryLinkButton from '@/Components/PrimaryLinkButton';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

const Form = ({ survey = null }) => {
    const goBackLink = route('admin.surveys.index');
    const edit = survey ? true : false;
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            title: survey.title ?? '',
            description: survey.description ?? '',
            active_status: survey.description ?? true,
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await post(route('admin.surveys.store', data));
            toast.success('Survey Created Successfully');
        } catch (error) {
            toast.error('Failed to create survey. Please try again');
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {!edit ? 'Create' : 'Edit'} Survey
                </h2>
            }
        >
            <Head title={`${!edit ? 'Create' : 'Edit'} Survey`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <header className="mb-4">
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            {!edit ? 'Create' : 'Edit'} Survey
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            {!edit ? 'Create' : 'Edit'} Survey
                                        </p>
                                    </div>
                                    <PrimaryLinkButton href={goBackLink}>
                                        <i className="fa fa-angle-double-left"></i>
                                        &nbsp;Go Back
                                    </PrimaryLinkButton>
                                </div>
                            </header>

                            <form
                                className="mt-6 space-y-6"
                                onSubmit={handleSubmit}
                            >
                                <div className="mb-3 grid grid-cols-12 items-center justify-center gap-3">
                                    <div className="col-span-10 mb-2">
                                        <InputLabel
                                            htmlFor="title"
                                            value="Survey Title"
                                            required={true}
                                        />
                                        <TextInput
                                            id="title"
                                            className="mt-1 block w-full"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData('title', e.target.value)
                                            }
                                            required
                                            isFocused
                                            autoComplete="title"
                                            placeholder="Enter Survey Title"
                                        />
                                        <InputError
                                            message={errors.title}
                                            className="mb-2"
                                        />
                                    </div>
                                    <div className="col-span-2 mb-2">
                                        <div className="flex items-center justify-center gap-3">
                                            <Checkbox
                                                className="size-5"
                                                checked={data.active_status}
                                            />
                                            <InputLabel
                                                htmlFor="active_status"
                                                value="Active Status"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 mb-2">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Survey Description"
                                        />
                                        <TextArea
                                            id="description"
                                            className="mt-1 block w-full"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            isFocused
                                            autoComplete="description"
                                            placeholder="Enter Survey Description..."
                                            rows={5}
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <div className="flex justify-between">
                                            <DangerLinkButton href={goBackLink}>
                                                <i className="fa fa-times"></i>
                                                &nbsp;Cancel
                                            </DangerLinkButton>
                                            <PrimaryButton href={goBackLink}>
                                                <i className="fa fa-upload"></i>
                                                &nbsp;{!edit? 'Create' : 'Edit'}
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Form;
