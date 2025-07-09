"use client";

import Link from "next/link";
import React from "react";
import { CiUser } from "react-icons/ci";

export default function ProfileAvatar() {
  return (
    <Link
      href="profile"
      type="button"
      className="bg-primary rounded-full size-8 grid place-content-center"
    >
      <CiUser className="text-lg" />
    </Link>
  );
}
