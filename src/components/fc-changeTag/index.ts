import { defineComponent, reactive, toRefs, onMounted } from "vue";

export default defineComponent({
  props: {},
  components: {
    Image,
  },
  setup() {
    const state = reactive({
      options:[
        {
          label:'FC-LHY',
          value:'FC-LHY',
        },
        {
          label:'FC-WL',
          value:'DESKTOP-4V6V6A0',
        },
        {
          label:'FC-YY',
          value:'DESKTOP-MR6CNR5',
        },
      ],
      tag:'FC-LHY',
    });

    onMounted(() => {});

    const handleSelectChange=(value:string)=>{
      localStorage.setItem('tag',value)
    }
    return {
      ...toRefs(state),
      handleSelectChange,
    };
  },
});
