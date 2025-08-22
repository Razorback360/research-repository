import {
  HiOutlineArrowLeft,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineUser
} from "react-icons/hi2";
import Button from '@app/components/Button';
import ProfileSidebar from '@app/components/ProfileSidebar';
import Link from "next/link";
import { useRef, useState } from "react";

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [revealPassword, setRevealPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-1/5 bg-white p-5 shadow-md md:flex flex-col hidden">
        <div className="text-gray-600 mb-5">
          <h1 className="text-xl font-bold">Profile Navigation</h1>
        </div>
        <ProfileSidebar />
      </aside>
      <main className="flex-1 py-8 px-4 md:px-8 bg-white my-8 mx-4 md:mx-8 rounded-lg">
        <header className="flex md:justify-between items-center justify-center border-b pb-4 mb-8">
          <h2 className="text-3xl font-bold md:flex hidden">Profile Details</h2>
          <h2 className="text-3xl font-bold md:hidden flex text-center items-center justify-center md:me-0 me-6">
            <Link href="/profile/mobile">
              <HiOutlineArrowLeft className="w-[24px] h-[24px] me-2 ms-2" />
            </Link>
            Profile Details
          </h2>
        </header>
        <section className="flex items-center mb-8">
          <a className="md:w-32 md:h-32 w-19 h-19 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer opacity-65 hover:opacity-100"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <span className={fileInputRef.current?.files && fileInputRef.current.files[0] && !removeImage ? 'hidden' : 'text-gray-400 text-4xl'}>
              <HiOutlineUser className="w-[60px] h-[60px]" />
            </span>
            <img
              src={fileInputRef.current?.files && fileInputRef.current.files[0] ? URL.createObjectURL(fileInputRef.current.files[0]) : ''}
              alt="Profile"
              className={fileInputRef.current?.files && fileInputRef.current.files[0] && !removeImage ? 'w-full h-full object-cover rounded-full' : 'hidden'}
            />
          </a>
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={() => {
            setRefresh(prev => !prev)
            setRemoveImage(false)
          }} />
          <div className="ms-10 text-gray-500">
            <p>Click image area to change</p>
            <p>Image requirements:</p>
            <ul className="list-disc ms-5 space-y-1">
              <li>Min. 400px x 400px</li>
              <li>Max. 2MB</li>
            </ul>
            <div className={fileInputRef.current?.files && fileInputRef.current.files[0] && !removeImage ? "" : "hidden"}>
              <a className="block bg-red-600 text-white rounded-md px-4 text-center mt-2 py-2 cursor-pointer hover:shadow-md hover:bg-red-500" onClick={() => setRemoveImage(true)}>Remove</a>
            </div>
          </div>

        </section>
        <section className="w-full">
          <h3 className="text-xl font-semibold mb-4">User Details</h3>
          <form className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="text-gray-600">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                className={"w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:border-blue-500" + (editMode ? '' : ' cursor-not-allowed bg-secondary-200')}
                pattern="^[A-Za-z]+$"
                title="First name must be alphabetic letters only."
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                disabled={!editMode}
                value={form.firstName}
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="text-gray-600">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className={"w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:border-blue-500" + (editMode ? '' : ' cursor-not-allowed bg-secondary-200')}
                pattern="^[A-Za-z]+$"
                title="Last name must be alphabetic letters only."
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                disabled={!editMode}
                value={form.lastName}
              />
            </div>
            <div className="col-span-2">
              <label className="text-gray-600">Email Address</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full cursor-not-allowed px-4 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:border-blue-500 bg-secondary-200"
                title="Email must be in the following example format: janedoe12@outlook.com"
                disabled
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={revealPassword.password ? "text" : "password"}
                  placeholder="************"
                  className={"w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:border-blue-500" + (editMode ? '' : ' cursor-not-allowed bg-secondary-200')}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
                  title="Password must have at least 1 of each: Uppercase letter, Lowercase letter, Symbol. Password must be at least 8 chars long"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  disabled={!editMode}
                  value={form.password}
                />
                <a className="absolute inset-y-0 right-4 flex items-center cursor-pointer" onClick={() => setRevealPassword({ ...revealPassword, password: !revealPassword.password })}>
                  {revealPassword.password ? <HiOutlineEye className="w-[24px] h-[24px]" /> : <HiOutlineEyeSlash className="w-[24px] h-[24px]" />}
                </a>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="text-gray-600">Confirm Password</label>
              <div className="relative">
                <input
                  type={revealPassword.confirmPassword ? "text" : "password"}
                  placeholder="************"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:border-blue-500 ${form.password ? '' : 'cursor-not-allowed bg-secondary-200'}`}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$"
                  title="Password must have at least 1 of each: Uppercase letter, Lowercase letter, Symbol. Password must be at least 8 chars long"
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  disabled={!editMode}
                  value={form.confirmPassword}
                />
                <a className="absolute inset-y-0 right-4 flex items-center cursor-pointer" onClick={() => setRevealPassword({ ...revealPassword, confirmPassword: !revealPassword.confirmPassword })}>
                  {revealPassword.confirmPassword ? <HiOutlineEye className="w-[24px] h-[24px]" /> : <HiOutlineEyeSlash className="w-[24px] h-[24px]" />}
                </a>
              </div>
            </div>
          </form>

          <Button className={`w-full cursor-pointer bg-primary text-white hover:shadow-2xl`}
            onClick={() => {
              if (editMode) {
                // Save changes
              }
              setEditMode(!editMode)
            }}
          >
            {editMode ? 'Save' : 'Edit'}
          </Button>
        </section>
      </main>
    </div>
  );
}
