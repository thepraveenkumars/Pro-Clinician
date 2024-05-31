/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { formateDate } from '../../src/utils/formateDate';

const Appointments = ({ appointments }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
                <thead className="bg-gray-100 text-gray-700 uppercase">
                    <tr>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Blood Type</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Price</th>
                        <th className="px-6 py-3 text-left">Slot</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {appointments?.map(item => (
                        <tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-6 py-4 flex items-center">
                                {item.user && (
                                    <>
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full" src={item.user.photo} alt="User" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{item.user.name}</div>
                                        </div>
                                    </>
                                )}
                            </td>
                            <td className="px-6 py-4">{item.user?.email || 'N/A'}</td>
                            <td className="px-6 py-4">{item.user?.bloodType || 'N/A'}</td>
                            <td className="px-6 py-4">
                                {item.isPaid ? (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                        Paid
                                    </span>
                                ) : (
                                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full">
                                        Unpaid
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-gray-900">${item.ticketPrice}</td>
                            <td className="px-6 py-4 text-gray-900">{formateDate(item.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Appointments;
