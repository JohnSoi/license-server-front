<script lang="ts">
import { defineComponent } from 'vue';
import SourceService from "../../../services/SourceService";
import {Emmiter} from "../../../helpers/BusEvents";

export default defineComponent({
  props: {
    source: {
      required: true,
      type: SourceService
    }
  },
  beforeMount() {
    this.getDataInSource();
    Emmiter.on('changeSearchString', (value: string) => {
      this.getDataInSource({searchString: value}) ;
    });
    Emmiter.on('changeFilter', (filter: any) => {
      this.getDataInSource(filter);
    });
    Emmiter.on('cardSave', () => {
      this.getDataInSource();
    });
  },
  data() {
    return {
      data: null
    }
  },
  methods: {
    load() {
      return [];
    },
    getDataInSource(filter: any = {}) {
      this.source.list(filter).then((result) => {
        if (result.success) {
          this.data = result.data;
        }
      });
    }
  }
});
</script>
