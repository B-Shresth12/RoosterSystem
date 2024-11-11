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
import { parseQuestionType } from '@/utils/Helper';
import { Head, useForm } from '@inertiajs/react';

const QuestionForm = ({ surveyId, question, questionTypes, sections }) => {
    const edit = question ? true : false;
    const goBackLink = route('admin.questions.index', surveyId);

    const { data, setData, post, patch, errors, processing } = useForm({
        question: '',
        question_section: '',
        question_type: '',
        active_status: true,
        description: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await post(
                route('admin.questions.store', {
                    surveyId: surveyId,
                    mode: 'question',
                }),
                data,
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { checked } = e.target;
        setData({ ...data, active_status: checked });
    };

    return (
        <AuthenticatedLayout header={<Header title={'Question Management'} />}>
            <Head title={`Add Questions`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <header className="mb-4">
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            {`${!edit ? 'Add' : 'Edit'}`}{' '}
                                            Question
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            {`${!edit ? 'Add' : 'Edit'}`} Add
                                            Question in organized way according
                                            to the question section
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
                                    <div className="col-span-12 mb-2">
                                        <InputLabel
                                            htmlFor="question"
                                            value="Question"
                                            required={true}
                                        />
                                        <TextInput
                                            id="question"
                                            className="mt-1 block w-full"
                                            defaultValue={data.question}
                                            onChange={(e) =>
                                                setData(
                                                    'question',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            isFocused
                                            autoComplete="question"
                                            placeholder="Enter Question"
                                        />
                                        <InputError
                                            message={errors.title}
                                            className="mb-2"
                                        />
                                    </div>
                                    <div className="col-span-5 mb-2">
                                        <InputLabel
                                            htmlFor="question_section"
                                            value="Question Section"
                                            required={true}
                                        />
                                        <select
                                            id="question_section"
                                            className="w-full rounded-lg bg-gray-900 px-4 py-2"
                                            required
                                            onChange={(e) =>
                                                (data.question_section =
                                                    e.target.value)
                                            }
                                        >
                                            <option selected disabled>
                                                -- Choose Question Section --
                                            </option>
                                            {sections.map((value, index) => (
                                                <option
                                                    key={`${index}-section`}
                                                    value={value.id}
                                                >
                                                    {value.text}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.title}
                                            className="mb-2"
                                        />
                                    </div>
                                    <div className="col-span-5 mb-2">
                                        <InputLabel
                                            htmlFor="question_type"
                                            value="Question Type"
                                            required={true}
                                        />
                                        <select
                                            id="question_type"
                                            className="w-full rounded-lg bg-gray-900 px-4 py-2"
                                            required
                                            onChange={(e) =>
                                                (data.question_type =
                                                    e.target.value)
                                            }
                                        >
                                            <option selected disabled>
                                                -- Choose Question Type --
                                            </option>
                                            {questionTypes.map(
                                                (value, index) => (
                                                    <option
                                                        key={`${index}-type`}
                                                        value={value}
                                                    >
                                                        {parseQuestionType(
                                                            value,
                                                        )}
                                                    </option>
                                                ),
                                            )}
                                        </select>
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
                                            htmlFor="description"
                                            value="Question Description"
                                            required={false}
                                        />
                                        <TextArea
                                            id="description"
                                            className="mt-1 block w-full"
                                            defaultValue={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    'description',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            isFocused
                                            autoComplete="description"
                                            placeholder="Enter Question Description"
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

export default QuestionForm;
