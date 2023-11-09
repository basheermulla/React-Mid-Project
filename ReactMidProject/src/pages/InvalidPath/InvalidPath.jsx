import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function InvalidPath({ callbackInvalidPath }) {
    const navigate = useNavigate();

    useEffect(() => {
        // Not Found or You do not have permission
        const invalidPath = () => {
            callbackInvalidPath(true);
            console.log('Sweet');
            Swal.fire({
                type: "error",
                title: "Oops...",
                text: "Path Not Found"
            }).then((result) => {
                if (result.value) {
                    callbackInvalidPath(false);
                    navigate('/', {});
                }
            });
        }

        invalidPath();
    }, [])

    return (
        <>
            <div className="col-sm-5">

            </div>
        </>
    )
}

export default InvalidPath