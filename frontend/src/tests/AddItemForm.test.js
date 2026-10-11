import { mount } from '@vue/test-utils'
import AddItemForm from '../components/AddItemForm.vue'

// Mock axios to avoid actual backend calls
vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: 'Item submitted successfully!' }))
  }
}))

describe('AddItemForm.vue', () => {
  test('renders and validates all fields including location', async () => {
    const wrapper = mount(AddItemForm)

    // 🧩 Fill invalid values
    await wrapper.find('input[type="text"]').setValue('ab') // title
    await wrapper.find('textarea').setValue('short') // description
    const textInputs = wrapper.findAll('input[type="text"]')
    await textInputs[1].setValue('') // location
    await textInputs[2].setValue('') // reporterName
    await wrapper.find('input[type="email"]').setValue('invalidEmail') // reporterContact
    await wrapper.find('select').setValue('false') // Lost type

    // 🧠 Trigger validation
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    // ✅ Check key validation messages
    const text = wrapper.text()
    expect(text).toContain('Title must be at least 3 characters.')
    expect(text).toContain('Description too short.')
    expect(text).toContain('Enter your name.')
    expect(text).toContain('Enter a valid email.')

    // 🧪 Ensure submission didn’t happen because form invalid
    expect(wrapper.vm.message).toBe('')
  })

  test('disables submit button when invalid', async () => {
    const wrapper = mount(AddItemForm)
    const button = wrapper.find('button[type="submit"]')
    expect(button.attributes('disabled')).toBeDefined()
  })

  test('submits successfully when form valid', async () => {
    const wrapper = mount(AddItemForm)
    const inputs = wrapper.findAll('input[type="text"]')

    // 🧩 Fill valid values
    await inputs[0].setValue('Lost Phone') // title
    await wrapper.find('textarea').setValue('A black phone found near canteen.') // description
    await inputs[1].setValue('Canteen') // location
    await inputs[2].setValue('Darshan') // reporterName
    await wrapper.find('input[type="email"]').setValue('darshan@example.com')
    await wrapper.find('select').setValue('true')

    // 🧠 Submit
    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()

    // ✅ Assert success message is shown
    expect(wrapper.text()).toContain('Item submitted successfully!')
  })
})
