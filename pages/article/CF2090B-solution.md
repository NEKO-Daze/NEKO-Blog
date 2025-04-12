[洛谷CF2090B](https://www.luogu.com.cn/problem/CF2090B) || [CodeForces 2090 B](https://codeforces.com/contest/2090/problem/B)

### 简要题意
对于一个 $n\times m$ 的网格，进行了若干次操作，每次往网格的最上端或者最左端推入一个球，如果最上端或者最左端已经有球，那么之前的球会向下或向右（即被推至里部）以空出位置给新推入的球。

现给出网格的最终状态，判断其是否合法，即是否可以通过题目所述的方法达到此状态。

### 思路
对于每个有球的格子，球只可能从行首或列首推入，并由其他球推到该位置。因此其上所有的格子或其左所有的格子必有其一是被球填满的，以表明球是从此方向推入而来的。

因此，对于每个球，我们检查每个球上方所有的格子是否都为 $1$，或左边所有的格子是否都为 $1$，满足其一即可。如果二者皆不满足，证明此状态是不合法的。

为降低时间复杂度，可以先预处理出每个球的上方格子或左边格子是否皆为 $1$，并存储在 `r_pre` 与 `c_pre` 中。

[通过记录](https://codeforces.com/contest/2090/submission/311979722)

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        int n, m;
        cin >> n >> m;
        vector<string> a(n);
        for (int i = 0; i < n; ++i) cin >> a[i];
        vector<vector<bool>> c_pre(m, vector<bool>(n + 1, false));
        vector<vector<bool>> r_pre(n, vector<bool>(m + 1, false));
        for (int i = 0; i < n; ++i)
        {
            r_pre[i][0] = true;
            for (int j = 1; j <= m; ++j) r_pre[i][j] = r_pre[i][j - 1] && (a[i][j - 1] == '1');
        }
        for (int j = 0; j < m; ++j)
        {
            c_pre[j][0] = true;
            for (int i = 1; i <= n; ++i) c_pre[j][i] = c_pre[j][i - 1] && (a[i - 1][j] == '1');
        }
        bool flag = true;
        for (int i = 0; i < n; ++i)
        {
            for (int j = 0; j < m; ++j)
            {
                if (a[i][j] == '1')
                {
                    bool R = r_pre[i][j];
                    bool C = c_pre[j][i];
                    if (!R && !C)
                    {
                        flag = false;
                        goto end;
                    }
                }
            }
        }
    end:
        cout << (flag ? "YES" : "NO") << '\n';
    }
    return 0;
}
```