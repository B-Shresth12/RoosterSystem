import DangerButton from '@/Components/DangerButton';
import Header from '@/Components/Header';
import PrimaryLinkButton from '@/Components/PrimaryLinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { arrayMatch } from '@/utils/Helper';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

const Index = ({ surveys }) => {
    const [lists, setLists] = useState(surveys);
    console.table(lists);
    const createSurveyLink = route('admin.surveys.create');

    const handleOrder = async (state) => {
        if (!arrayMatch(state, lists)) {
            const orderWiseId = state.map((item) => item.id);
            try {
                await router.post(
                    route('admin.surveys.order', { order: orderWiseId }),
                );
                setLists(state);
            } catch (error) {}
        }
    };

    const getyQuestionURL = (id) => {
        return route('admin.questions.index', id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this data?')) {
            try {
                await router.delete(route('admin.surveys.destroy', id));
                setLists(lists.filter((list) => list.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const geteditURL = (id) => {
        return route('admin.surveys.edit', id);
    };
    return (
        <AuthenticatedLayout header={<Header title={`Survey Management`} />}>
            <Head title="Survey Management" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <header className="mb-4">
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            Survey Lists
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            Here are the list of surveys to
                                            collect data
                                        </p>
                                    </div>
                                    <PrimaryLinkButton href={createSurveyLink}>
                                        <i className="fa fa-plus"></i>
                                        &nbsp;Create Survey
                                    </PrimaryLinkButton>
                                </div>
                            </header>

                            <ReactSortable list={lists} setList={handleOrder}>
                                {lists.map((list) => (
                                    <div
                                        key={list.id}
                                        className="mb-2 w-full rounded-xl bg-white p-4 dark:bg-gray-900"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center justify-normal gap-2">
                                                <div>
                                                    <i className="fa fa-bars"></i>
                                                </div>
                                                <div>{list.title}</div>
                                                <div
                                                    className={`rounded-lg border px-2 py-1 ${list.is_active ? 'border-green-700 bg-green-700' : 'border-red-700 bg-red-700'}`}
                                                >
                                                    {list.is_active
                                                        ? 'Active'
                                                        : 'Expired'}
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="flex items-center justify-center gap-2">
                                                    <PrimaryLinkButton
                                                        href={getyQuestionURL(
                                                            list.id,
                                                        )}
                                                        aria-label={`Questions`}
                                                    >
                                                        <i className="fa fa-bars"></i>
                                                    </PrimaryLinkButton>
                                                    <PrimaryLinkButton
                                                        href={geteditURL(
                                                            list.id,
                                                        )}
                                                    >
                                                        <i className="fa fa-edit"></i>
                                                    </PrimaryLinkButton>
                                                    <DangerButton
                                                        type="button"
                                                        onClick={(e) =>
                                                            handleDelete(
                                                                list.id,
                                                            )
                                                        }
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </DangerButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ReactSortable>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
