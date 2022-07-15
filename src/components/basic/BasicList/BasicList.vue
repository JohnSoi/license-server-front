<script lang="ts">
import { defineComponent } from 'vue';
import SourceService from "@/services/SourceService";
import {Emmiter} from "@/helpers/BusEvents";
import {throttleCall} from "@/helpers/Core";

const getSource = function(filter: any, self: any) {
    self.source.list(filter).then((result: any) => {
        if (result.success) {
            self.data = result.data;
        }
    })
};

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
  data(): {[key: string]: any} {
    return {
      data: null,
        throttleSource: throttleCall(getSource, 500)
    }
  },
  methods: {
    load() {
      return [];
    },
    getDataInSource(filter: any = {}) {
        this.throttleSource(filter, this);
    }
  }
});
</script>
