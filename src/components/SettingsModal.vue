<template>
  <div :class="['ui dimmer page transition', { 'visible active': visible}]">
    <div :class="['ui small modal transition', { 'visible active': visible}]" id="settingsModal">
      <i class="close icon" @click="hide"></i>
      <div class="header">Settings</div>
      <div class="content ui form">
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" v-model="$parent.multiSort">
            <label>Multisort (use Alt+Click)</label>
          </div>
        </div>
        <div class="inline fields">
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox" checked="$parent.tableHeight" @change="setTableHeight($event)">
              <label>Table Height</label>
            </div>
          </div>
          <div class="field">
            <input type="text" v-model="$parent.tableHeight">
          </div>
        </div>
        <div class="ui divider"></div>
        <div class="field">
          <label>Pagination:</label>
          <select class="ui simple dropdown" v-model="$parent.paginationComponent">
            <option value="vuetable-pagination">vuetable-pagination</option>
            <option value="vuetable-pagination-dropdown">vuetable-pagination-dropdown</option>
          </select>
        </div>
        <div class="field">
          <label>Per Page:</label>
          <select class="ui simple dropdown" v-model="$parent.perPage">
            <option :value="10">10</option>
            <option :value="15">15</option>
            <option :value="20">20</option>
            <option :value="25">25</option>
          </select>
        </div>
        <div class="ui fluid card">
          <div class="content">
            <div class="header">Visible fields</div>
          </div>
          <div v-if="vuetableFields" class="content">
            <div v-for="(field, idx) in vuetableFields" class="field" :key="idx">
              <div class="ui checkbox">
                <input type="checkbox" :checked="field.visible" @change="toggleField(field, $event)">
                <label>{{ getFieldTitle(field) }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui cancel button" @click="hide">Close</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['vuetableFields'],

  data() {
    return {
      visible: false
    };
  },

  computed: {
    vuetable() {
      return this.$parent.$refs.vuetable
    }
  },

  methods: {
    getFieldTitle(field) {
      if (typeof field.title === "function") return field.title(true);

      let title = field.title;
      if (title !== "") return this.stripHTML(title);

      return title;
    },

    stripHTML(str) {
      return str ? str.replace(/(<([^>]+)>)/gi, "") : "";
    },

    toggleField(field, event) {
      this.vuetable.toggleField(field.$_index);
    },

    show() {
      this.visible = true;
    },

    hide() {
      this.visible = false;
    }
  }
};
</script>

<style>
#settingsModal {
  top: 60px;
}
</style>
