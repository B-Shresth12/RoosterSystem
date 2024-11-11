import DangerButton from '@/Components/DangerButton';
import Header from '@/Components/Header';
import PrimaryButton from '@/Components/PrimaryButton';
import PrimaryLinkButton from '@/Components/PrimaryLinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Nestable from 'react-nestable';
import 'react-nestable/dist/styles/index.css';

const Index = ({ surveyId, questions }) => {
    const [list, setList] = useState(questions);
    const goBackLink = route('admin.surveys.index');
    const addSection = route('admin.questions.create', {
        surveyId: surveyId,
        mode: 'section',
    });
    const addQuestion = route('admin.questions.create', {
        surveyId: surveyId,
        mode: 'question',
    });
    const getEditUrl = (item) => {
        if (item.parent_id == null) {
            return route('admin.questions.edit', {
                surveyId: surveyId,
                question: item.id,
                mode: 'section',
            });
        }
        return route('admin.questions.edit', {
            surveyId: surveyId,
            question: item.id,
            mode: 'question',
        });
    };

    const renderItem = ({ item }) => (
        <div className="mb-2 rounded-lg bg-gray-900 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-4">
                    <div>
                        <i className="fa fa-bars"></i>&nbsp;{item.text}
                        &nbsp;&nbsp;
                    </div>
                    <div
                        className={`rounded-lg border px-2 py-1 ${item.status ? 'border-green-700 bg-green-700' : 'border-red-700 bg-red-700'}`}
                    >
                        {item.status ? 'Active' : 'In Active'}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <PrimaryButton type={`button`}>
                        <i className="fa fa-plus"></i>
                    </PrimaryButton>
                    <PrimaryLinkButton href={getEditUrl(item)}>
                        <i className="fa fa-edit"></i>
                    </PrimaryLinkButton>
                    <DangerButton
                        type={`button`}
                        onClick={(e) => handleDelete(item.id)}
                    >
                        <i className="fa fa-trash"></i>
                    </DangerButton>
                </div>
            </div>
        </div>
    );

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this data?')) {
            try {
                await router.delete(
                    route('admin.questions.destroy', {
                        surveyId: surveyId,
                        question: id,
                    }),
                );
                setList(list.filter((list) => list.id !== id));
                // console.table(list)
            } catch (error) {
                console.error(error);
            }
        }
    };
    return (
        <AuthenticatedLayout header={<Header title={`Question Management`} />}>
            <Head title={`Question Management`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <header className="mb-4">
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            Question Management
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            List of all questions
                                        </p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <PrimaryLinkButton href={goBackLink}>
                                            <i className="fa fa-angle-double-left"></i>
                                            &nbsp;Go Back
                                        </PrimaryLinkButton>
                                        <PrimaryLinkButton href={addSection}>
                                            <i className="fa fa-plus"></i>
                                            &nbsp;Add Section
                                        </PrimaryLinkButton>
                                        <PrimaryLinkButton href={addQuestion}>
                                            <i className="fa fa-plus"></i>
                                            &nbsp;Add Question
                                        </PrimaryLinkButton>
                                    </div>
                                </div>
                            </header>
                            <Nestable
                                items={list}
                                renderItem={renderItem}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
