import { DashboardComponentType } from '@prisma/client'
import { Button, Modal } from '@ui-components'
import { useEffect, useState } from 'react'
import DashboardComponentUpdateForm from './DashboardComponentUpdateForm'
import './dboard-component-create.css'
import { HiOutlinePlus } from 'react-icons/hi2'

interface IChartType {
  type: DashboardComponentType
  title: string
  desc: string
  icon: string
}

const charts: IChartType[] = [
  {
    type: DashboardComponentType.SUMMARY,
    title: 'Number of Tasks in Progress',
    desc: 'See how many tasks are in progress in any location',
    icon: '🚀'
  },
  {
    type: DashboardComponentType.SUMMARY,
    title: 'Number of Tasks Closed',
    desc: 'See how many tasks are closed in any location',
    icon: '🎄'
  },
  {
    type: DashboardComponentType.SUMMARY,
    title: 'Number of Upcoming Tasks',
    desc: 'See how many tasks are done in any location',
    icon: '🔮'
  },
  {
    type: DashboardComponentType.SUMMARY,
    title: 'Total Urgent Tasks',
    desc: 'Display the total amount of Urgent tasks by location',
    icon: '🚑'
  },
  {
    type: DashboardComponentType.SUMMARY,
    title: 'Total Overdue Tasks',
    desc: 'Display the total amount of Overdue tasks by location',
    icon: '🌋'
  },
  {
    type: DashboardComponentType.SUMMARY,
    title: 'Today Tasks',
    desc: 'Display the total amount of today tasks by location',
    icon: '💼'
  },
  {
    type: DashboardComponentType.COLUMN,
    title: 'Task by statuses',
    desc: 'Display the total amount of task by status',
    icon: '🚦'
  },
  {
    type: DashboardComponentType.BURNDOWN,
    title: 'Burndown Chart',
    desc: 'Utilize the Burndown Chart to analyze the progress of tasks.',
    icon: '📉'
  },
  {
    type: DashboardComponentType.BURNUP,
    title: 'Burnup Chart',
    desc: 'Utilize the Burnup Chart to analyze the progress of tasks.',
    icon: '📈'
  },
  {
    type: DashboardComponentType.PIE,
    title: 'Pie Chart',
    desc: 'Visualize distribution of tasks',
    icon: '🥧'
  },
  {
    type: DashboardComponentType.BURNDOWN,
    title: 'Burndown (Alt)',
    desc: 'Alternative burndown visualization',
    icon: '📉'
  },
  {
    type: DashboardComponentType.LIST,
    title: 'List View',
    desc: 'Display tasks in list format',
    icon: '📋'
  }
]

export default function DashboardComponentCreate() {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<IChartType | null>(null)

  const showSettingForm = !!type

  useEffect(() => {
    if (!visible) setType(null)
  }, [visible])

  return (
    <div>
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Select your components"
        className={showSettingForm ? 'show-setting-component-form' : ''}
        size={showSettingForm ? 'base' : 'lg'}
        triggerBy={
          <div>
            <Button
              leadingIcon={<HiOutlinePlus />}
              title="Create component"
            />
          </div>
        }
        content={
          <>
            {!showSettingForm && (
              <div className="grid grid-cols-3 gap-2">
                {charts.map((c, cid) => {
                  const { type, title, desc, icon } = c
                  return (
                    <div
                      onClick={() => setType(c)}
                      key={cid}
                      className={`chart-type chart-type-${type} group`}
                    >
                      <span className="text-3xl opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all">
                        {icon}
                      </span>
                      <h2 className="chart-title">{type}</h2>
                      <h3 className="text-xs font-bold text-gray-600 group-hover:text-indigo-600 transition-all">
                        {title}
                      </h3>
                      <p className="text-gray-500 text-xs">{desc}</p>
                    </div>
                  )
                })}
              </div>
            )}

            {showSettingForm && type && (
              <DashboardComponentUpdateForm
                {...type}
                onCloseModal={() => setVisible(false)}
                onBack={() => setType(null)}
              />
            )}
          </>
        }
      />
    </div>
  )
}