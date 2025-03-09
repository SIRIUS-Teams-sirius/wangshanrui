<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>攻击类型</th>
          <th>攻击者IP</th>
          <th>攻击目的IP</th>
          <th>攻击时间</th>
          <th>相应措施</th>
          <th>事件状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in events" :key="index">
          <td>{{ item.type }}</td>
          <td>{{ item.attackerIp }}</td>
          <td>{{ item.targetIp }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.response }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [
        {
          type: 'DOS',
          attackerIp: '192.168.1.1',
          targetIp: '10.0.0.1',
          time: '2023-01-01 12:00',
          response: '已封禁',
          status: '已处理'
        },
        {
          type: 'R2L',
          attackerIp: '192.168.1.2',
          targetIp: '10.0.0.2',
          time: '2023-01-02 13:00',
          response: '修复漏洞',
          status: '待处理'
        },
        {
          type: 'NORMAL',
          attackerIp: '192.168.1.3',
          targetIp: '10.0.0.3',
          time: '2023-01-03 14:00',
          response: '警告用户',
          status: '已处理'
        },
        {
          type: 'DOS',
          attackerIp: '192.168.1.4',
          targetIp: '10.0.0.4',
          time: '2023-01-04 15:00',
          response: '已封禁',
          status: '已处理'
        },
        {
          type: 'NORMAL',
          attackerIp: '192.168.1.5',
          targetIp: '10.0.0.5',
          time: '2023-01-05 16:00',
          response: '修复漏洞',
          status: '待处理'
        },
        {
          type: 'DOS',
          attackerIp: '192.168.1.6',
          targetIp: '10.0.0.6',
          time: '2023-01-06 17:00',
          response: '警告用户',
          status: '已处理'
        },
        {
          type: 'U2R',
          attackerIp: '192.168.1.7',
          targetIp: '10.0.0.7',
          time: '2023-01-07 18:00',
          response: '已封禁',
          status: '已处理'
        }
      ]
    };
  },
  mounted() {
    this.startScroll();
  },
  methods: {
    startScroll() {
      setInterval(() => {
        const firstItem = this.events.shift(); // 移除第一项
        this.events.push(firstItem); // 将第一项添加到末尾
      }, 2000); // 每2秒滚动一次
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 10px auto;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.97); /* 深色背景 */
  color: #ffffff; /* 白色文字 */
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
  overflow: hidden; /* 隐藏溢出内容 */
}

table {
  width: 100%;
  border-collapse: collapse;
  max-height: 200px; /* 设置表格最大高度 */
  overflow-y: hidden; /* 隐藏垂直滚动条 */
  display: block; /* 使表格可以滚动 */
}

th, td {
  padding: 2px; /* 减小行高 */
  border: 1px solid #444; /* 边框颜色 */
  text-align: left;
  width: 16.66%; /* 使每列宽度相等 */
}

th {
  
  color: #ffffff; /* 表头文字颜色 */
  font-weight: bold; /* 表头文字加粗 */
  width: 10%; /* 设置表头宽度 */

}

tbody {
  display: block;
  max-height: 150px; /* 设置 tbody 的最大高度 */
  overflow-y: hidden; /* 隐藏滚动条 */
}


tbody tr:nth-child(even) {
  background-color: #2b2b2b; /* 偶数行背景 */
}
</style>