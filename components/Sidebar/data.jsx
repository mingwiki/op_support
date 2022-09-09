import {
  LinkOutlined,
  CloudUploadOutlined,
  UserOutlined,
  PaperClipOutlined,
  QrcodeOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
export const data = [
  {
    key: '1',
    icon: <LinkOutlined />,
    label: <Link href='01'>生成小程序链接</Link>,
  },
  {
    key: '2',
    icon: <QrcodeOutlined />,
    label: <Link href='02'>二维码生成工具</Link>,
  },
  {
    key: '3',
    icon: <UserOutlined />,
    label: <Link href='03'>查询管理已有链接</Link>,
  },
  // {
  //   key: '4',
  //   icon: <PaperClipOutlined />,
  //   label: <Link to='04'>解析Page参数</Link>,
  // },
  // {
  //   key: '5',
  //   icon: <CloudUploadOutlined />,
  //   label: <Link to='05'>批量上传小程序链接</Link>,
  // },
]
