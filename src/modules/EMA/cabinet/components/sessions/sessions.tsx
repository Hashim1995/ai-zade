import {
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';
import { BsAndroid2 } from 'react-icons/bs';
import { MdOutlineLaptopMac } from 'react-icons/md';
import { TbDeviceIpad } from 'react-icons/tb';
import { FaWindows, FaLinux, FaApple, FaBlackberry } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { IUserSessions } from '@/models/user';
import { AuthService } from '@/services/auth-services/auth-services';

function Sessions() {
  const { t } = useTranslation();

  const [userSessions, setUserSessions] = useState<IUserSessions[]>([]);

  async function getUserSessions() {
    try {
      const res = await AuthService.getInstance().getUserSessions();
      if (res?.isSuccess) {
        setUserSessions(res?.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUserSessions();
  }, []);

  const returnDeviceIconByType = (type: number) => {
    switch (type) {
      case 1:
        return (
          <MdOutlineLaptopMac
            className="text-default-900 dark:text-white"
            size={20}
          />
        );
      case 2:
        return (
          <FaWindows className="text-default-900 dark:text-white" size={20} />
        );
      case 3:
        return (
          <FaLinux className="text-default-900 dark:text-white" size={20} />
        );
      case 4:
        return (
          <FaLinux className="text-default-900 dark:text-white" size={20} />
        );
      case 5:
        return (
          <FaApple className="text-default-900 dark:text-white" size={20} />
        );
      case 6:
        return (
          <FaApple className="text-default-900 dark:text-white" size={20} />
        );
      case 7:
        return (
          <FaBlackberry
            className="text-default-900 dark:text-white"
            size={20}
          />
        );
      case 8:
        return (
          <BsAndroid2 className="text-default-900 dark:text-white" size={20} />
        );
      default:
        return (
          <TbDeviceIpad
            className="text-default-900 dark:text-white"
            size={20}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <h3 className="font-semibold text-default-800 text-xl dark:text-white">
        {t('sessions')} 💻
      </h3>

      <div className="border-1 border-divider bg-transparent shadow-lg p-6 rounded-2xl w-full">
        <Table
          removeWrapper
          className="text-default-900 dark:text-white"
          classNames={{
            thead: '!bg-transparent',
            tr: '!bg-transparent',
            th: '!bg-transparent'
          }}
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn>{t('platformName').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('browserName').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('ipAddress').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('loginDate').toLocaleUpperCase()}</TableColumn>
            <TableColumn>{t('status').toLocaleUpperCase()}</TableColumn>
          </TableHeader>
          <TableBody items={userSessions} loadingContent={<Spinner />}>
            {item => (
              <TableRow key={item?.id}>
                <TableCell className="flex items-center gap-2">
                  {returnDeviceIconByType(item.platformType)}
                  {item?.platformName}
                </TableCell>
                <TableCell>{item?.browserName}</TableCell>
                <TableCell>{item?.ipAddress}</TableCell>
                <TableCell>{item?.loginDate}</TableCell>
                <TableCell>
                  {' '}
                  <Chip
                    className="text-default-900 dark:text-white"
                    color={item?.status ? 'success' : 'danger'}
                  >
                    {item?.status ? 'Aktiv' : item?.status}
                  </Chip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Sessions;
