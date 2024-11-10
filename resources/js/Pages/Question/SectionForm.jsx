import Checkbox from '@/Components/Checkbox';
import DangerLinkButton from '@/Components/DangerLinkButton';
import Header from '@/Components/Header';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryLinkButton from '@/Components/PrimaryLinkButton';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

const SectionForm = ({ surveyId, question = null }) => {
    const goBackLink = route('admin.questions.index', surveyId);
    const edit = question ? true : false;

    const { data, setData, post, patch, errors, processing } = useForm({
        section_name: question?.text ?? '',
        section_description: question?.description ?? '',
        active_status: question?.status ?? true,
    });

    const handleChange = (e) => {
        const { checked } = e.target;
        setData({ ...data, active_status: checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (edit)
                patch(
                    route('admin.questions.update', {
                        surveyId: surveyId,
                        question: question.id,
                        mode: 'section',
                    }),
                    data,
                );
            else
                post(
                    route('admin.questions.store', {
                        surveyId: surveyId,
                        mode: 'section',
                    }),
                    data,
                );
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <AuthenticatedLayout header={<Header title={`Add Question Section`} />}>
            <Head title={`Add Question Section`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <header className="mb-4">
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            {`${!edit ? 'Add' : 'Edit'}`}{' '}
                                            Question Section
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            {`${!edit ? 'Add' : 'Edit'}`}{' '}
                                            Question Section to organize a group
                                            of questions
                                        </p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <PrimaryLinkButton href={goBackLink}>
                                            <i className="fa fa-angle-double-left"></i>
                                            &nbsp;Go Back
                                        </PrimaryLinkButton>
                                    </div>
                                </div>
                            </header>
                            <form
                                className="mt-6 space-y-6"
                                onSubmit={handleSubmit}
                            >
                                <div className="mb-3 grid grid-cols-12 items-center justify-center gap-3">
                                    <div className="col-span-10 mb-2">
                                        <InputLabel
                                            htmlFor="section_name"
                                            value="Section Name"
                                            required={true}
                                        />
                                        <TextInput
                                            id="section_name"
                                            className="mt-1 block w-full"
                                            defaultValue={data.section_name}
                                            onChange={(e) =>
                                                setData(
                                                    'section_name',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            isFocused
                                            autoComplete="section_name"
                                            placeholder="Enter Section Name"
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
                                                id="active_status"
                                                checked={data.active_status}
                                                onChange={handleChange}
                                            />
                                            <InputLabel
                                                htmlFor="active_status"
                                                value="Active Status"
                                            />
                                        </div>
                                        <InputError
                                            message={errors.active_status}
                                            className="mb-2"
                                        />
                                    </div>

                                    <div className="col-span-12 mb-2">
                                        <InputLabel
                                            htmlFor="section_description"
                                            value="Section Description"
                                            required={false}
                                        />
                                        <TextArea
                                            id="section_description"
                                            className="mt-1 block w-full"
                                            defaultValue={
                                                data.section_description
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    'section_description',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            isFocused
                                            autoComplete="section_description"
                                            placeholder="Enter Section Description"
                                            rows={5}
                                        />
                                        <InputError
                                            message={errors.title}
                                            className="mb-2"
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <div className="flex justify-between">
                                            <DangerLinkButton
                                                href={goBackLink}
                                                disabled={processing}
                                            >
                                                <i className="fa fa-times"></i>
                                                &nbsp;Cancel
                                            </DangerLinkButton>
                                            <PrimaryButton
                                                disabled={processing}
                                            >
                                                <i className="fa fa-upload"></i>
                                                &nbsp;
                                                {!edit ? 'Add' : 'Edit'}
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

export default SectionForm;
