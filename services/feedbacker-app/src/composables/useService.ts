// import services from '~/utils/services'

export const useServices = () => {
  console.log('======== useServices');

  return useState('services', () => 'bar')
}
