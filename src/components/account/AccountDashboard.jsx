import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Account.scss";
const AccountDashboard = () => {
  return (
    <>
      <div className="axil-dashboard-overview">
        <div className="welcome-text">
          Chào Bạn,
          {/* Hello {{ customer?.customerName }} (not
    <span>{{ customer?.customerName }}?</span>
    <a href="javascript:;" (click)="logout()">Đăng Xuất</a>) */}
        </div>
        <p>
          Từ bảng điều khiển tài khoản của bạn, bạn có thể xem các đơn đặt hàng
          gần đây của mình, quản lý địa chỉ giao hàng, cập nhật thông tin cá
          nhân.
        </p>
        <p>
          Hãy luôn đồng hành cùng nhà <strong>FRAGILE CLUB</strong> nhé!.
        </p>
        <div className="bye-text">
          <p>Trân Trọng</p>
          <strong>FRAGILE</strong>.
        </div>
      </div>
    </>
  );
};

export default AccountDashboard;
