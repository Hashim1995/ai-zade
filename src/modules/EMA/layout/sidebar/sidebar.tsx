import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
  Switch,
  useDisclosure,
  User
} from '@nextui-org/react';
import {
  BsArrowRightCircle,
  BsBarChart,
  BsChatDots,
  BsGear,
  BsMailbox,
  BsQuestionCircle
} from 'react-icons/bs';
import {
  MdOutlineDashboard,
  MdOutlineLeaderboard,
  MdOutlineCampaign,
  MdOutlineMarkEmailUnread,
  MdOutlineAttachEmail,
  MdAttachMoney
} from 'react-icons/md';

import { useLocation, useNavigate } from 'react-router-dom';
import logoWhite from '@assets/images/logo-text-white.webp';
// import logoBlack from '@assets/images/logo-text-black.webp';
import logoBlue from '@assets/images/logo-text-blue.webp';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { AiOutlineUser } from 'react-icons/ai';
import { TbReportAnalytics } from 'react-icons/tb';
import useDarkMode from 'use-dark-mode';
import { useTranslation } from 'react-i18next';
import { MoonIcon } from '@/assets/icons/moon-icon';
import FeedbackModal from '@/core/static-components/feedback-modal';
import { SunIcon } from '@/assets/icons/sun-icon';
import { Sidebar } from './sidebar.styles';
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';

export function SidebarWrapper() {
  const navigate = useNavigate();

  const {
    isOpen: feedBackModalIsOpen,
    onOpen: feedBackModalOnOpen,
    onOpenChange: feedBackModaOnOpenChange
  } = useDisclosure();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const { pathname } = location;
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light',
    global: window // Just pass this as a config option
  });
  return (
    <aside className="top-0 z-[20] sticky h-screen remove-scrollbar">
      {/* {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null} */}

      <div
        className={Sidebar({
          collapsed: false
        })}
      >
        <div className={Sidebar.Header()}>
          <img
            src={darkMode.value ? logoWhite : logoBlue}
            className="h-8 cursor-pointer"
            aria-hidden
            onClick={() => {
              navigate('/');
            }}
            alt="Ablarva logo"
          />
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarMenu title={t('main')}>
              <SidebarItem
                title="Dashboard"
                icon={
                  <MdOutlineDashboard className="text-default-900 dark:text-white" />
                }
                isActive={pathname === '/email-marketing'}
                href="/email-marketing"
              />
              <SidebarItem
                isActive={pathname.includes('/chat')}
                title="Chat"
                icon={
                  <BsChatDots className="text-default-900 dark:text-white" />
                }
                href="chat"
              />
              <SidebarItem
                isActive={pathname.includes('/leads')}
                title="Leads"
                icon={
                  <MdOutlineLeaderboard className="text-default-900 dark:text-white" />
                }
                href="leads"
              />{' '}
            </SidebarMenu>

            <SidebarMenu title={t('others')}>
              <SidebarItem
                isActive={pathname.includes('/mailbox')}
                title="Mailbox"
                icon={
                  <BsMailbox className="text-default-900 dark:text-white" />
                }
                href="mailbox"
              />{' '}
              <SidebarItem
                isActive={pathname.includes('/campaigns')}
                title="Campaigns"
                icon={
                  <MdOutlineCampaign className="text-default-900 dark:text-white" />
                }
                href="campaigns"
              />{' '}
              <SidebarItem
                isActive={pathname.includes('/pending-mails')}
                title="Pending mails"
                icon={
                  <MdOutlineMarkEmailUnread className="text-default-900 dark:text-white" />
                }
                href="pending-mails"
              />{' '}
              <SidebarItem
                isActive={pathname.includes('/connected-mails')}
                title="Connected mails"
                icon={
                  <MdOutlineAttachEmail className="text-default-900 dark:text-white" />
                }
                href="connected-mails"
              />{' '}
              <SidebarItem
                isActive={pathname.includes('/analytics')}
                title="Analytics"
                icon={
                  <BsBarChart className="text-default-900 dark:text-white" />
                }
                href="analytics"
              />
            </SidebarMenu>
          </div>

          <div>
            <div className="flex justify-center items-center gap-6 px-8 pt-1 md:pt-10 pb-8 md:pb-0">
              {user?.id ? (
                <User
                  name={
                    user ? `${user.firstName} ${user.lastName}` : t('empty')
                  }
                  description={user.email || t('empty')}
                  avatarProps={{
                    size: 'sm',
                    src: `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=0D8ABC&color=fff`
                  }}
                  className="sm:flex hidden text-default-800 dark:text-white"
                />
              ) : (
                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="rounded-lg w-3/5 h-3" />
                  <Skeleton className="rounded-lg w-4/5 h-3" />
                </div>
              )}

              <Dropdown className="">
                <DropdownTrigger className="">
                  <div>
                    <BsGear
                      className="text-default-900 dark:text-white cursor-pointer"
                      size={16}
                    />
                  </div>
                </DropdownTrigger>
                <DropdownMenu
                  className="text-default-900 dark:text-white"
                  aria-label="Static Actions"
                >
                  <DropdownItem
                    className=""
                    onClick={() => {
                      navigate('cabinet');
                    }}
                    key="cabinet"
                  >
                    <p className="flex items-center gap-2 m-0">
                      <AiOutlineUser className="text-default-900 dark:text-white" />{' '}
                      {t('cabinet')}
                    </p>
                  </DropdownItem>
                  <DropdownItem
                    className=""
                    onClick={() => {
                      navigate('sender-information');
                    }}
                    key="sender-information"
                  >
                    <p className="flex items-center gap-2 m-0">
                      <TbReportAnalytics className="text-default-900 dark:text-white" />{' '}
                      {t('senderInformation')}
                    </p>
                  </DropdownItem>
                  <DropdownItem
                    className=""
                    onClick={() => {
                      navigate('billing');
                    }}
                    key="billing"
                  >
                    <p className="flex items-center gap-2 m-0">
                      <MdAttachMoney className="text-default-900 dark:text-white" />{' '}
                      {t('billing')}
                    </p>
                  </DropdownItem>

                  <DropdownItem
                    className=""
                    onClick={() => {
                      localStorage.removeItem('userToken');
                      window.location.reload();
                    }}
                    key="logout"
                  >
                    <p className="flex items-center gap-2 m-0">
                      <BsArrowRightCircle className="text-default-900 dark:text-white" />{' '}
                      {t('logOut')}
                    </p>
                  </DropdownItem>
                  <DropdownItem className="" key="theme">
                    <div className="flex justify-between">
                      <Switch
                        defaultSelected={darkMode.value}
                        onValueChange={darkMode.toggle}
                        size="sm"
                        startContent={<MoonIcon />}
                        endContent={<SunIcon />}
                      />
                      <p
                        aria-hidden
                        onClick={() => {
                          feedBackModalOnOpen();
                        }}
                        className="flex items-center gap-2 m-0"
                      >
                        <BsQuestionCircle className="text-default-900 dark:text-white" />{' '}
                      </p>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        {feedBackModalIsOpen && (
          <FeedbackModal
            onOpenChange={feedBackModaOnOpenChange}
            isOpen={feedBackModalIsOpen}
          />
        )}
      </div>
    </aside>
  );
}
