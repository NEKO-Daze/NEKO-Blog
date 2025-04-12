

// 禁用 marked 的转义逻辑

  
  async function renderMarkdownWithLatex(url, containerId) {
    try {
      const response = await fetch(url);
      const rawMd = await response.text();
      const htmlContent = marked.parse(rawMd);
      
      // 分步插入 DOM
      const container = document.getElementById(containerId);
      container.innerHTML = htmlContent;
      
      // 正确触发 MathJax 渲染队列
      MathJax.startup.promise.then(() => {
        setTimeout(() => MathJax.typesetPromise(), 500); // 应对极端加载延迟‌:ml-citation{ref="1,6" data="citationList"}
      }).catch(console.error);
      
    } catch (error) {
      console.error('渲染失败:', error);
    }
  }
  // 统一调用入口
window.onload = () => renderMarkdownWithLatex('CF2090B-solution.md', 'content');
