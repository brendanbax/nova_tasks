import { mount } from '@vue/test-utils'
import Dialog from '@/components/Dialog.vue'

describe('Dialog.vue', () => {
  it('renders the provided content to the DOM', async () => {
    const wrapper = mount(Dialog, {
      propsData: {
        message: 'Sample message',
        action: 'Sample action',
        dismiss: 'Sample dismiss'
      }
    })

    const message = wrapper.find('h2')
    const action = wrapper.find('#action')
    const dismiss = wrapper.find('#dismiss')

    expect(message.text()).toContain('Sample message')
    expect(action.text()).toContain('Sample action')
    expect(dismiss.text()).toContain('Sample dismiss')
  })

  it('emits an action when action button is clicked', async () => {
    const wrapper = mount(Dialog)

    // Interaction
    await wrapper.find('#action').trigger('click')
    expect(Object.keys(wrapper.emitted())).toContain('action')
  })

  it('emits a dismiss when dismiss button is clicked', async () => {
    const wrapper = mount(Dialog, {
      propsData: {
        message: 'Sample message',
        action: 'Sample action',
        dismiss: 'Sample dismiss'
      }
    })

    // Interaction
    await wrapper.find('#dismiss').trigger('click')
    expect(Object.keys(wrapper.emitted())).toContain('dismiss')
  })
})
