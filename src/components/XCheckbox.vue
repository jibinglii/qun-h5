<template>
  <div class="x-spec-input">
    <span class="x-spec-input-title">{{ title }}</span>
    <label
      v-for="(item, index) in items"
      :key="index"
      class="x-spec-input-item"
      :class="{active:item.checked}"
    >
      <input
        :name="title"
        v-model="content"
        :type="type"
        :value="item.value"
        @change="change(item)"
      />
      {{ item.label }}
    </label>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "values",
    event: "input"
  },
  props: {
    data: Object,
    title: String,
    type: {
      type: String,
      default: "radio"
    },
    values: {
      type: [String, Number]
    }
  },
  data() {
    return {
      content: [],
      items: []
    };
  },
  methods: {
    change(item) {
      if (this.type == "checkbox") {
        this.$set(item, "checked", !item.checked);
        this.$emit("input", this.content.join(","));
      }
      if (this.type == "radio") {
        this.items.forEach(item => {
          this.$set(item, "checked", false);
        });
        this.$set(item, "checked", true);
        this.$emit("input", this.content);
      }
    },
    initItems() {
      Object.keys(this.data).forEach(item => {
        this.items.push({
          label: this.data[item],
          value: item,
          checked: false
        });
      });
    },
    selectItem(v) {
      if (this.type == "checkbox") {
        let checked = v.toString().split(",");
        this.content.push(...checked);
        Object.keys(this.items).forEach(item => {
          if (checked.indexOf(this.items[item].value) > -1) {
            this.items[item].checked = true;
          }
        });
      } else {
        this.content.push(v);
        Object.keys(this.items).forEach(item => {
          if (this.items[item].value == v) {
            this.items[item].checked = true;
          }
        });
      }
    }
  },
  created() {
    this.initItems();
    this.selectItem(this.values);
  },
  watch: {
    data() {
      this.initItems();
    },
    values(v) {
      if (this.content.length == 0) {
        selectItem(v);
      }
    }
  }
};
</script>

<style lang="scss">
.x-spec-input {
  padding: 0.75rem;
  .x-spec-input-title {
    display: block;
    font-size: 0.6rem;
    color: #000;
    text-align: center;
    padding-bottom: 0.5rem;
  }
  .x-spec-input-item {
    float: left;
    width: 27%;
    height: 40px;
    list-style-type: none;
    line-height: 40px;
    margin: 5px 8px;
    border-radius: 5px;
    text-align: center;
    font-size: 0.6rem;
    color: #000;
    border: solid 1px #606060;
    input {
      display: none;
    }
    input:checked {
      color: rebeccapurple;
    }
  }
  .active {
    color: #fff;
    background-color: #000;
    border: solid 1px #000;
  }
  .clear {
    clear: both;
  }
}
</style>
