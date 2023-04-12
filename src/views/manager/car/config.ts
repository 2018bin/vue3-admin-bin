import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const formList: any[] = [
  {
    label: t('searchTable.form.number'),
    value: 'number',
    type: 'input',
    setLength: '8',
  },
  {
    label: t('searchTable.form.name'),
    value: 'name',
    type: 'input',
    setLength: '8',
  },
  {
    label: t('searchTable.form.contentType'),
    value: 'contentType',
    type: 'select',
    options: [
      {
        label: t('searchTable.form.contentType.img'),
        value: 'img',
      },
      {
        label: t('searchTable.form.contentType.horizontalVideo'),
        value: 'horizontalVideo',
      },
      {
        label: t('searchTable.form.contentType.verticalVideo'),
        value: 'verticalVideo',
      },
    ],
    setLength: '8',
  },
  {
    label: t('searchTable.form.filterType'),
    value: 'filterType',
    type: 'select',
    options: [
      {
        label: t('searchTable.form.filterType.artificial'),
        value: 'artificial',
      },
      {
        label: t('searchTable.form.filterType.rules'),
        value: 'rules',
      },
    ],
    setLength: '8',
  },
  {
    label: t('searchTable.form.createdTime'),
    value: 'createdTime',
    type: 'rangeDate',
    setLength: '8',
  },
  {
    label: t('searchTable.form.status'),
    value: 'status',
    type: 'select',
    options: [
      {
        label: t('searchTable.form.status.online'),
        value: 'online',
      },
      {
        label: t('searchTable.form.status.offline'),
        value: 'offline',
      },
    ],
    setLength: '8',
  },
];
export default formList;
