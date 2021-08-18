import { mount } from '@vue/test-utils'
import Popover from '@/components/Popover.vue'

describe('Popover.vue', () => {
  it('renders a list of provided options when clicked', async () => {
    const options = ['Foo', 'Bar', 'Baz']
    const wrapper = mount(Popover, {
      propsData: { options }
    })

    // Interaction
    await wrapper.find('button').trigger('click')
    const list = wrapper.findAll('.option')

    expect(list.length).toBe(options.length)
  })

  it('emits the selected option value', async () => {
    const options = ['Foo', 'Bar', 'Baz']
    const wrapper = mount(Popover, {
      propsData: { options }
    })

    // Interaction
    await wrapper.find('button').trigger('click')
    await wrapper.findAll('.option').at(0).trigger('click')

    expect(wrapper.emitted().select![0]).toEqual(['Foo'])
  })
})
