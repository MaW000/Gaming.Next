import React from 'react'
export function Container({
    children,
    classNames = "",
}: {
    children: React.ReactNode;
    classNames?: string;
}) {
    return (
        <div className={`bg-slate-600 ${classNames}`}>
            {children}
        </div>
    )
}