"use client";

import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useGetProfile from "@/app/(user)/profile/information/hooks/useGetProfileAccount";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditPersonal from "@/app/(user)/profile/information/components/edit-personal";
import EditEmail from "@/app/(user)/profile/information/components/edit-email";
import ChangePassword from "@/app/(user)/profile/information/components/change-password";
import { Skeleton } from "@/components/ui/skeleton";
import { parseDateTimeString } from "@/utils/date";
import { formatCurrencyVND } from "@/utils/format-currency";

export default function ProfileComponent() {
  const [editInfoPopup, setEditInfoPopup] = useState<boolean>(false);
  const [editEmailPopup, setEditEmailPopup] = useState<boolean>(false);
  const [editPasswordPopup, setEditPasswordPopup] = useState<boolean>(false);

  const [profileInfo, setProfileInfo] = useState<API.TProfileAccount>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: 1,
    phoneNumber: "",
    status: false,
  });



  const getProfile = useGetProfile();

  const handleCloseEditInfo = () => {
    setEditInfoPopup(false);
  };

  const handleOpenEditInfo = () => {
    setEditInfoPopup(true);
  };

  const handleCloseEditEmail = () => {
    setEditEmailPopup(false);
  };

  const handleOpenEditEmail = () => {
    setEditEmailPopup(true);
  };

  const handleCloseEditPassword = () => {
    setEditPasswordPopup(false);
  };

  const handleOpenEditPassword = () => {
    setEditPasswordPopup(true);
  };

  const handleFetchProfile = async () => {
    const initialData = {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      gender: 1,
      phoneNumber: "",
      status: false,
    };
    try {
      const res = await getProfile.getInfoProfileApi();
      setProfileInfo(res?.value.data || initialData);
    } catch (err) {
      setProfileInfo(initialData);
    }
  };

  useEffect(() => {
    handleFetchProfile();
  }, []);


  return (
    <div>
      <div className="flex gap-x-3">
        <div className="basis-[58%] py-5 border-1 border-gray-300 rounded-2xl bg-white shadow-box-shadown mt-40 mx-auto">
          {getProfile.isPending ? (
            <div>
              <div className="flex flex-col gap-y-6 px-8">
                <header className="flex items-center justify-between gap-x-3">
                  <h2 className="text-xl font-semibold">
                    Thông tin cá nhân
                  </h2>
                  <div className="flex items-center gap-x-3"></div>
                </header>
                <form>
                  <div className="flex flex-col gap-y-5">
                    <div className="flex items-center justify-between gap-x-3">
                      <div className="basis-1/2 flex flex-col gap-y-2">
                        <label className="text-[15px] font-medium text-gray-400">
                          Tên
                        </label>
                        <Skeleton className="w-1/2 h-[20px] rounded-full" />
                      </div>

                      <div className="basis-1/2 flex flex-col gap-y-2">
                        <label className="text-[15px] font-medium text-gray-400">
                          Họ
                        </label>
                        <Skeleton className="w-1/2 h-[20px] rounded-full" />
                      </div>
                    </div>

                    <div className="basis-1/2 flex flex-col gap-y-2">
                      <label className="text-[15px] font-medium text-gray-400">
                        Địa chỉ email
                      </label>
                      <Skeleton className="w-1/2 h-[20px] rounded-full" />
                    </div>

                    <div className="basis-1/2 flex flex-col gap-y-2">
                      <label className="text-[15px] font-medium text-gray-400">
                        Số điện thoại
                      </label>
                      <h5 className="text-base text-gray-650">
                        <Skeleton className="w-1/2 h-[20px] rounded-full" />
                      </h5>
                    </div>

                    <div className="basis-1/2 flex flex-col gap-y-2">
                      <label className="text-[15px] font-medium text-gray-400">
                        Giới tính
                      </label>
                      <Skeleton className="w-1/2 h-[20px] rounded-full" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-y-6 px-8">
              <header className="flex items-center justify-between gap-x-3">
                <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
                <div className="flex items-center gap-x-3">
                  {profileInfo?.loginType === 1 && (
                    <Fragment>
                      <Button
                        type="button"
                        onClick={handleOpenEditEmail}
                        className="px-5 rounded-2xl bg-transparent border-2 border-gray-300 hover:bg-gray-300"
                      >
                        <span className="text-gray-700">Chỉnh sửa email</span>
                      </Button>
                      <Button
                        type="button"
                        onClick={handleOpenEditPassword}
                        className="px-3 rounded-2xl bg-transparent border-2 border-gray-300 hover:bg-gray-300"
                      >
                        <span className="text-gray-700">Chỉnh sửa mật khẩu</span>
                      </Button>
                    </Fragment>
                  )}

                  <Button
                    type="button"
                    onClick={handleOpenEditInfo}
                    className="px-5 rounded-2xl bg-transparent border-2 border-gray-300 hover:bg-gray-300"
                  >
                    <span className="text-gray-700">Chỉnh sửa thông tin</span>
                  </Button>
                </div>
              </header>
              <form>
                <div className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between gap-x-3">
                    <div className="basis-1/2 flex flex-col gap-y-2">
                      <label className="text-[15px] font-medium text-gray-400">
                        Tên
                      </label>
                      <h5 className="text-base text-gray-650">
                        {profileInfo?.firstName}
                      </h5>
                    </div>

                    <div className="basis-1/2 flex flex-col gap-y-2">
                      <label className="text-[15px] font-medium text-gray-400">
                        Họ
                      </label>
                      <h5 className="text-base text-gray-650">
                        {profileInfo?.lastName}
                      </h5>
                    </div>
                  </div>

                  <div className="basis-1/2 flex flex-col gap-y-2">
                    <label className="text-[15px] font-medium text-gray-400">
                      Địa chỉ email
                    </label>
                    <h5 className="text-base text-gray-650">
                      {profileInfo.email}
                    </h5>
                  </div>

                  <div className="basis-1/2 flex flex-col gap-y-2">
                    <label className="text-[15px] font-medium text-gray-400">
                      Số điện thoại
                    </label>
                    <h5 className="text-base text-gray-650">
                      {profileInfo.phoneNumber?.length > 0
                        ? `+84 ${profileInfo.phoneNumber}`
                        : "Unknown"}
                    </h5>
                  </div>

                  <div className="basis-1/2 flex flex-col gap-y-2">
                    <label className="text-[15px] font-medium text-gray-400">
                      Giới tính
                    </label>
                    <h5 className="text-base text-gray-650">
                      {profileInfo.gender === 1 ? "Male" : "Female"}
                    </h5>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
        {profileInfo?.email !== "" && editInfoPopup && (
          <EditPersonal
            open={editInfoPopup}
            onClose={handleCloseEditInfo}
            information={profileInfo}
            fetchProfileApi={handleFetchProfile}
          />
        )}
        {profileInfo?.email !== "" && editEmailPopup && (
          <EditEmail
            open={editEmailPopup}
            onClose={handleCloseEditEmail}
            information={profileInfo}
            fetchProfileApi={handleFetchProfile}
          />
        )}

        {profileInfo?.email !== "" && editPasswordPopup && (
          <ChangePassword
            open={editPasswordPopup}
            onClose={handleCloseEditPassword}
          />
        )}
      </div>
    </div>
  );
}
