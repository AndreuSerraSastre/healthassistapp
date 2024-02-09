import React from "react";
import {
  CheckCircleTwoTone,
  WarningTwoTone,
  CalendarOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
  LinkOutlined,
  MailTwoTone,
  ClockCircleOutlined,
  GlobalOutlined,
  CloseCircleTwoTone,
  PlusCircleTwoTone,
  EditOutlined,
  PlusCircleOutlined,
  SaveOutlined,
  DeleteOutlined,
  BarsOutlined,
  PaperClipOutlined,
  SaveTwoTone,
  SyncOutlined,
  CheckCircleOutlined,
  RollbackOutlined,
  WarningFilled,
  QuestionCircleOutlined,
  MenuOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import AppPlusIcon from "../assets/app/plusIcon";
import colors from "./../constants/colors";

export const MenuIcon = ({ isCollapsed }) => (
  <MenuOutlined style={{ transform: isCollapsed ? "" : "rotate(90deg)" }} />
);
export const ToolbarMainIcon = () => <AppPlusIcon />;
export const LogInIcon = () => (
  < LoginOutlined />
);

//  ANTD
export const ClipperIcon = () => <PaperClipOutlined />;
export const CheckIconX = () => (
  <CheckCircleTwoTone twoToneColor={colors.scheme["color-success-500"]} />
);
export const WarningIcon = () => (
  <WarningFilled style={{ color: colors.scheme["color-warning-500"] }} />
);
export const WarningIconX = () => (
  <WarningTwoTone twoToneColor={colors.scheme["color-warning-500"]} />
);
export const LinkIcon = () => <LinkOutlined />;
export const MailIconX = () => <MailTwoTone />;
export const ClockIcon = () => <ClockCircleOutlined />;
export const CalendarIcon = () => <CalendarOutlined />;
export const WorldClockIcon = () => <GlobalOutlined />;
export const RightArrowIcon = () => <CaretRightOutlined />;
export const LeftArrowIcon = () => <CaretLeftOutlined />;
export const CloseIconX = () => (
  <CloseCircleTwoTone twoToneColor={colors.scheme["color-danger-500"]} />
);
export const PlusIcon = () => <PlusCircleOutlined />;
export const PlusIconX = () => (
  <PlusCircleTwoTone twoToneColor={colors.scheme.main} />
);
export const EditIcon = () => <EditOutlined />;
export const SaveIcon = () => <SaveOutlined />;
export const SaveIconX = () => (
  <SaveTwoTone twoToneColor={colors.scheme.main} />
);
export const DeleteIcon = () => <DeleteOutlined />;
export const RestoreIcon = () => <RollbackOutlined />;
export const ResumeIcon = () => <BarsOutlined />;
export const QuestionIcon = () => <QuestionCircleOutlined />;

// CUSTOM
export const InProcessTaskIcon = () => <SyncOutlined />;
export const PendingTaskIcon = () => (
  <ClockCircleOutlined style={{ color: colors.scheme["warning"] }} />
);
export const FinishedTaskIcon = () => (
  <CheckCircleOutlined style={{ color: colors.scheme["color-success-500"] }} />
);
