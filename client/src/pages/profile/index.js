import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UpdateProfilePicture } from '../../apicalls/users';
import { ShowLoader, HideLoader } from '../../redux/loaderSlice';
import toast from 'react-hot-toast';
import { SetUser } from '../../redux/userSlice';


function Profile() {
    const { user } = useSelector(state => state.userReducer)
    const [image = "", setImage] = React.useState("");
    const dispatch = useDispatch();


    const onFileSelect = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader(file);
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            console.log(reader.result);
            setImage(reader.result)
        }

    };
    useEffect(() => {
        if (user?.profilePic) {
            setImage(user.profilePic);
        }
    }, [user]);

    const updateProfilePic = async () => {
        try {
            dispatch(ShowLoader());
            const response = await UpdateProfilePicture(image);
            dispatch(HideLoader());
            if (response.success) {
                toast.success("Profile Pic Updated");
                dispatch(SetUser(response.data));

            } else {
                dispatch(HideLoader());
                toast.error(response.error);

            }
        } catch (error) {
            dispatch(HideLoader());
            toast.error(error.message);

        }

    }


    return (
        user && (
            <div className='flex items-center justify-center h-[80vh]'>
                <div className='text-xl font-semibold uppercase text-gray-500 flex flex-col gap-2 p-2 shadow-md border w-max border-gray-300 rounded '>
                    <h1 >
                        {user.name}
                    </h1>
                    <h1>
                        {user.email}
                    </h1>
                    <h1>
                        Created At : {moment(
                            user.createdAt
                        ).format('MMMM Do YYYY, h:mm:ss a')}
                    </h1>
                    {image && (
                        <img src={image} alt="profile pic" className='w-32 h-32 rounded-full' />
                    )}
                    <div className='flex gap-2'>
                        <label htmlFor="file-input" className='cursor-pointer'>
                            Update Profile Pic
                        </label>
                        <input type="file"
                            onChange={onFileSelect}
                            className='file-input'
                            id='file-input' />

                        <button className='contained-btn'
                            onClick={updateProfilePic}>
                            Update
                        </button>

                    </div>

                </div>
            </div>
        )
    )
}

export default Profile
