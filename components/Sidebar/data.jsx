import {
  LinkOutlined,
  CloudUploadOutlined,
  UserOutlined,
  PaperClipOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
export const data = [
  {
    key: '1',
    icon: <LinkOutlined />,
    label: <Link to='01'>生成小程序链接</Link>,
  },
  {
    key: '2',
    icon: <CloudUploadOutlined />,
    label: <Link to='02'>批量上传小程序链接</Link>,
  },
  {
    key: '3',
    icon: <UserOutlined />,
    label: <Link to='03'>个人中心</Link>,
  },
  {
    key: '4',
    icon: <PaperClipOutlined />,
    label: <Link to='04'>解析Page参数</Link>,
  },
]