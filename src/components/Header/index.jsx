import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="">
            <div className="flex justify-center">
                <img 
                    alt=""
                    className=""
                    src="/assets/logo-dark.svg"/>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-purple-600 hover:text-purple-500 underline">
                {linkName}
            </Link>
            </p>
        </div>
    )
}