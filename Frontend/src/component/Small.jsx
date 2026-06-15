import React from 'react'
import { useNavigate } from 'react-router-dom'

function Small() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="bg-black text-white py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Need a urgent</h2>
                    <p className="mb-6">Book your appointment in just 2 minutes</p>
                    <button onClick={() => navigate("/search-train")} className="bg-white text-black px-6 py-3 rounded-lg font-semibold">
                        Book Ticket
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Small
