<template>
  <div>

    <settings-modal ref="settingsModal"
      :vuetable-fields="vuetableFields"
    ></settings-modal>

    <div :class="['vuetable-wrapper ui basic segment', loading]">
      
      <div class="ui grid toolbar">
        <div class="ui left aligned ten wide column">
        </div>
        <div class="ui right aligned three wide column">
          <div class="ui checkbox">
            <input type="checkbox" id="toggleFilterRow" v-model="filterRowVisible">
            <label for="toggleFilterRow">Show Filter Row</label>
          </div>
        </div>
        <div class="ui right aligned three wide column">
          <button class="ui basic button" id="settingsBtn" @click="showSettingsModal">
            <i class="setting icon"></i>
            Settings
          </button>
        </div>
      </div>

      <vuetable ref="vuetable"
        api-url="https://vuetable.ratiw.net/api/users"
        :fields="fields"
        data-path="data"
        pagination-path=""
        :per-page="perPage"
        :multi-sort="multiSort"
        :table-height="tableHeight"
        :detail-row-component="detailRow"
        :css="{sortableIcon: 'grey sort icon'}"
        @vuetable:pagination-data="onPaginationData"
        @vuetable:initialized="onInitialized"
        @vuetable:loading="showLoader"
        @vuetable:loaded="hideLoader"
        @vuetable:cell-clicked="onCellClicked"
        @vuetable:scrollbar-visible="onScrollbarVisible"
      >
        <template slot="tableHeader">
          <vuetable-row-header></vuetable-row-header>
          <row-filter
            :visible="filterRowVisible"
            @vuetable:header-event="onRowHeaderEvent"
          ></row-filter>
        </template>
        <div slot="custom-actions" slot-scope="props">
          <button class="ui basic button" @click="onActionClicked('view-item', props.rowData)">
            <i class="zoom icon"></i>
          </button>
          <button class="ui basic button" @click="onActionClicked('edit-item', props.rowData)">
            <i class="edit icon"></i>
          </button>
          <button class="ui basic button" @click="onActionClicked('delete-item', props.rowData)">
            <i class="delete icon"></i>
          </button>
        </div>
      </vuetable>

      <div class="vuetable-pagination ui bottom attached segment grid">
        <vuetable-pagination-info ref="paginationInfo"
        ></vuetable-pagination-info>
        <component :is="paginationComponent" ref="pagination"
          @vuetable-pagination:change-page="onChangePage"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import Vuetable from "vuetable-2";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import VuetablePaginationDropdown from "vuetable-2/src/components/VuetablePaginationDropdown.vue";
import VuetablePaginationInfo from "vuetable-2/src/components/VuetablePaginationInfo.vue";
import VuetableRowHeader from "vuetable-2/src/components/VuetableRowHeader.vue";
import FieldsDef from "./FieldsDef.js";
import MyDetailRow from "./MyDetailRow";
import SettingsModal from "./SettingsModal";
import sweetAlert from "sweetalert2";
import RowFilter from "./RowFilter.vue";
import RowEventHandler from "./RowEventHandler.js";

export default {
  name: "MyVuetable",

  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationDropdown,
    VuetablePaginationInfo,
    VuetableRowHeader,
    RowFilter,
    SettingsModal
  },

  data() {
    return {
      fields: FieldsDef,
      detailRow: MyDetailRow,
      paginationComponent: "vuetable-pagination",
      vuetableFields: false,
      loading: "",
      tableHeight: "600px",
      multiSort: true,
      perPage: 10,
      filterRowVisible: true,
      scrollbarVisible: false
    };
  },

  watch: {
    perPage(newVal, oldVal) {
      this.$nextTick(() => {
        this.$refs.vuetable.refresh();
      });
    },

    paginationComponent(newVal, oldVal) {
      this.$nextTick(() => {
        this.$refs.pagination.setPaginationData(
          this.$refs.vuetable.tablePagination
        );
      });
    }
  },

  methods: {
    onPaginationData(tablePagination) {
      this.$refs.paginationInfo.setPaginationData(tablePagination);
      this.$refs.pagination.setPaginationData(tablePagination);
    },

    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },

    onInitialized(fields) {
      this.vuetableFields = fields.filter(field => field.togglable);
    },

    showLoader() {
      this.loading = "loading";
    },

    hideLoader() {
      this.loading = "";
    },

    showSettingsModal() {
      this.$refs.settingsModal.show();
    },

    onCellClicked({ data, field, event }) {
      if (field.name !== this.fieldPrefix + "actions") {
        this.$refs.vuetable.toggleDetailRow(data.id);
      }
    },

    onActionClicked(action, data) {
      sweetAlert(action, data.name);
    },

    onRowHeaderEvent(type, payload) {
      console.log("onRowHeaderEvent:", type, payload);

      let handler = RowEventHandler;

      return typeof handler[type] === "function"
        ? handler[type](this, this.$refs.vuetable, payload)
        : console.log("Unhandled event: ", type, payload);
    },

    onScrollbarVisible(toggle) {
      this.scrollbarVisible = toggle;
    }
  }
};
</script>

<style>
.vuetable button.ui.button {
  padding: 0.5em 0.5em;
  font-weight: 400;
}
.vuetable button.ui.button i.icon {
  margin-right: 0px !important;
}
.ui.grid.toolbar {
  padding-bottom: 10px;
}
</style>
