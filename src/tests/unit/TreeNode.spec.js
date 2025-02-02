import { mount } from '@vue/test-utils';
import TreeNode from '../../components/TreeNode.vue';

describe('TreeNode.vue', () => {
  let wrapper;
  let hospitalData;

  beforeEach(() => {
    hospitalData = [
      {
        id: 'hospital-1',
        name: 'Hospital One',
        children: [
          { id: 'child-1', name: 'Child 1' },
          { id: 'child-2', name: 'Child 2' },
        ],
      },
      {
        id: 'hospital-2',
        name: 'Hospital Two',
        children: [],
      },
    ];

    wrapper = mount(TreeNode, {
      propsData: { nodes: hospitalData },
    });
  });

  it('renders hospital names correctly', () => {
    const hospitalTitles = wrapper.findAll('.node-title');
    expect(hospitalTitles).toHaveLength(2);
    expect(hospitalTitles.at(0).text()).toBe('Hospital One');
    expect(hospitalTitles.at(1).text()).toBe('Hospital Two');
  });

  it('adds a new child node', async () => {
    const hospitalNode = wrapper.findAll('.tree-node').at(0);
    const addButton = hospitalNode.find('button:nth-of-type(1)');

    // Simulate adding a child node
    await addButton.trigger('click');

    // Verify the new child node is added
    expect(hospitalData[0].children).toHaveLength(3);
    expect(hospitalData[0].children[2].name).toBe('Child of Hospital One');
  });

  it('deletes a child node', async () => {
    const childNode = wrapper.findAll('.tree-node').at(0).findAll('.tree-node').at(0);
    const deleteButton = childNode.find('button:nth-of-type(2)');

    await deleteButton.trigger('click');

   
    expect(hospitalData[0].children).toHaveLength(1);
    expect(hospitalData[0].children.some(child => child.id === 'child-1')).toBe(false);
  });
});