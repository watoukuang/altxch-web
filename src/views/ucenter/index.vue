<template>
  <div class="user-layout">
    <Layout>
      <Sider hide-trigger width="220" class="menu-sider">
        <Menu
            theme="dark"
            mode="inline"
            :active-name="activeMenu"
            @on-select="changeContent"
            class="custom-menu"
        >
          <MenuItem name="spot" class="menu-item">
            <Icon type="ios-cash" />
            <span class="menu-text">现货钱包</span>
          </MenuItem>
          <MenuItem name="history" class="menu-item">
            <Icon type="ios-time" />
            <span class="menu-text">交易历史</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Content class="content-area">
          <div class="content-wrapper">
            <router-view />
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Layout, Sider, Content, Menu, MenuItem, Icon } from 'view-ui-plus';

const activeMenu = ref('spot');

const changeContent = (name) => {
  activeMenu.value = name;
};
</script>

<style scoped lang="scss">
.user-layout {
  height: 85vh;
  margin: 5px 0;
  overflow: hidden;
  background: #172636;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.05);

  .ivu-layout {
    height: 100%;
  }
}

.menu-sider {
  background: #172636;
  border-right: 1px solid rgba(255, 255, 255, 0.05);

  .custom-menu {
    background: transparent;
    height: 100%;
    padding-top: 15px;

    .menu-item {
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      margin: 4px 10px;
      transition: all 0.2s ease;
      color: rgba(255, 255, 255, 0.8);
      border-radius: 6px;

      &:hover {
        color: #fff;
        background: rgba(55, 255, 24, 0.1);
      }

      &.ivu-menu-item-active {
        color: #37ff18;
        background: rgba(55, 255, 24, 0.15);

        .ivu-icon {
          color: #37ff18;
        }
      }

      .ivu-icon {
        margin-right: 15px;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.7);
        transition: color 0.2s ease;
      }

      .menu-text {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}

.content-area {
  padding: 20px 20px; /* 明确指定上下左右边距 */
  background: #0b1520;
  min-height: calc(85vh - 40px);
  overflow: auto;
  box-sizing: border-box; /* 确保padding包含在高度计算内 */

  .content-wrapper {
    background: linear-gradient(135deg, #1a222e, #0f1a1f);
    border-radius: 8px;
    padding: 20px; /* 统一内边距 */
    min-height: calc(100% - 40px); /* 相对父元素高度 */
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-sizing: border-box; /* 确保padding包含在高度计算内 */
  }
}
</style>